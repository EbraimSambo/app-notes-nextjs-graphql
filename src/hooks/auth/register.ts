import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DocumentNode, gql, useMutation } from '@apollo/client'
import React from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    repeat_password: z.string().nonempty('Campo obrigatório'),
    email: z.string().email("Email inválido").nonempty("Campo obrigatório")
}).refine(({ password, repeat_password }) => password === repeat_password, {
    message: "As senhas não coincidem",
    path: ["repeat_password"]
})

type PropsSchema = z.infer<typeof schema>

const REGISTER_MUTATION: DocumentNode = gql`
  mutation CreateUser($name: String!,$email: String!, $password: String!) {
    createUser(fields: { name: $name,email: $email, password: $password }) {
      id
      email
      name
      password
    }
  }
`;

export function useRegister() {
    const [message, setMessage] = React.useState<{
        message: string,
        type?: "error" | "success" | "none"
    }>()
    const form = useForm<PropsSchema>({
        resolver: zodResolver(schema)
    })

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_MUTATION);
    const router = useRouter(); // Usando o router para redirecionamento
    const [isLoading, setIsLoading] = React.useState<boolean>(false); // Estado de loading personalizado

    async function handleSubmit(fields: PropsSchema) {
        setMessage({ message: "", type: undefined });
        setIsLoading(true); // Setando loading como true ao começar a mutação

        try {
            const { data } = await registerUser({
                variables: {
                    name: fields.name,
                    email: fields.email,
                    password: fields.password
                }
            });

            if (data?.createUser) {
                setMessage({ message: 'Conta criada com sucesso', type: "success" });
                router.push('/auth/login');
            }
        } catch (err) {
            console.error(err);

            if (error?.networkError) {
                setMessage({ message: 'Erro de conexão, verifique sua internet', type: "error" });
            } else {
                setMessage({ message: error?.message || 'Aconteceu algo de forma inesperada', type: "error" });
            }
        } finally {
            setIsLoading(false); // Desativando o loading após a operação
        }
    }

    return {
        form,
        handleSubmit,
        loading: isLoading || loading, // Usando o estado de loading personalizado
        message
    }
}
