import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DocumentNode, gql, useMutation } from '@apollo/client'

import React from 'react'
import { GET_NOTES_BY_USER_ID } from './get-notes'
import { Note } from '@/config/core/interfaces'
const schema = z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty()
})

type PropsSchema = z.infer<typeof schema>


const CREATE_NOTE = gql`
  mutation CreateNote($content: String!, $title: String!, $user_id: Int!) {
    createNote(fields: { content: $content, title: $title, user_id: $user_id }) {
      content
    }
  }
`;

export function useCreateNote(user_id: number) {
    const [message, setMessage] = React.useState<{
        message: string,
        type?: "error" | "sucess" | "none"
    }>()
    const form = useForm<PropsSchema>({
        resolver: zodResolver(schema)
    })

    const [createNote, { data, loading, error }] = useMutation(CREATE_NOTE,{
        update(cache, {data: {createNote}}){
            const existingNotes = cache.readQuery<{notes: Note[]}>({
                query: GET_NOTES_BY_USER_ID,
                variables: { user_id },
              });
              if (existingNotes) {
                cache.writeQuery<{notes: Note[]}>({
                  query: GET_NOTES_BY_USER_ID,
                  variables: { user_id },
                  data: {
                    notes: [...existingNotes?.notes, createNote], 
                  },
                });}
        }
    });

    async function handleSubmit(fields: PropsSchema) {
        setMessage({ message: "", type: undefined })
        try {
            await createNote({ variables: { title: fields.title, content: fields.content, user_id: user_id } })
            form.reset() 
            return setMessage({ message: 'Nota criada com sucesso', type: "sucess" })
        } catch (err) {
            console.log(error)
            console.log(error?.extraInfo)
            if (error?.networkError) {
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