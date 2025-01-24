import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { DocumentNode, gql, useMutation } from '@apollo/client'

import React from 'react'
const schema = z.object({
    password: z.string().nonempty('Campo obrigatorio'),
    email: z.string().email("Email invalido").nonempty("Campo obrigatorio")
})

type PropsSchema = z.infer<typeof schema>


const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(fields: { email: $email, password: $password }) {
      id,
      email
      name
      password
    }
  }
`;

export function useLogin() {
    const [message, setMessage] = React.useState<{
        message: string,
        type?: "error" | "sucess" | "none"
    }>()
    const form = useForm<PropsSchema>({
        resolver: zodResolver(schema)
    })

    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    async function handleSubmit(fields: PropsSchema) {
        setMessage({ message: "", type: undefined })
        try {
            await login({ variables: { email: fields.email, password: fields.password, } })
            console.log(data.login)
            return signIn("credentials", {
                id: data.login.id,
                email: data.login.email,
                name: data.login.name,
                callbackUrl: "/app",
                redirect: true
            })
        } catch (err) {
            console.log(error)
            console.log(error?.extraInfo)
            if(error?.networkError){
               return setMessage({ message: 'Erro de conexao, verifique a sua internete', type: "error" })
            }
            setMessage({ message: error?.message as string || 'Aconteceu algo de forma inesperada', type: "error" })
        }

    }

    return {
        form,
        handleSubmit,
        loading,
        message
    }

}