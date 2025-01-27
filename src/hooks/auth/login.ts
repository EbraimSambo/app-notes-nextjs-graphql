import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { DocumentNode, gql, useMutation } from '@apollo/client'

import React from 'react'

const schema = z.object({
    password: z.string().nonempty('Campo obrigatório'),
    email: z.string().email("Email inválido").nonempty("Campo obrigatório")
})

type PropsSchema = z.infer<typeof schema>

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(fields: { email: $email, password: $password }) {
      id
      email
      name
      password
    }
  }
`;

export function useLogin() {
    const [message, setMessage] = React.useState<{
        message: string,
        type?: "error" | "success" | "none"
    }>({ message: '', type: 'none' })
    
    const form = useForm<PropsSchema>({
        resolver: zodResolver(schema)
    })

    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)
const [isLoading, setIsLoading] = React.useState<boolean>(false); 
    async function handleSubmit(fields: PropsSchema) {
        setMessage({ message: '', type: 'none' }) // Resetando a mensagem antes da mutação
        setIsLoading(true);
        try {
            // Realiza a mutação para logar
            const { data: loginData } = await login({
                variables: { email: fields.email, password: fields.password }
            })
            
            if (loginData?.login) {
                setMessage({ message: 'Login feito com sucesso.', type: 'success' })
                setIsLoading(true);
                await signIn("credentials", {
                    id: loginData.login.id,
                    email: loginData.login.email,
                    name: loginData.login.name,
                    callbackUrl: "/",
                    redirect: true
                })
            } else {
                setIsLoading(false);
                setMessage({ message: 'Erro ao fazer login. Tente novamente.', type: 'error' })
            }
        } catch (err) {
            console.error('Erro durante o login:', err)

            // Tratamento de erro para falhas de rede
            if (error?.networkError) {
                setMessage({ message: 'Erro de conexão, verifique sua internet.', type: 'error' })
            } else {
                // Erro genérico
                setMessage({ message: error?.message || 'Aconteceu algo inesperado.', type: 'error' })
            }
        }finally {
            setIsLoading(false); // Desativando o loading após a operação
        }
    }

    return {
        form,
        handleSubmit,
        loading: isLoading || loading,
        message
    }
}
