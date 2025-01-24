"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { gql, useMutation } from '@apollo/client';
import { Trash } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { GET_NOTES_BY_USER_ID } from '../hooks/get-notes';
import { Note } from '@/config/core/interfaces';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';

const DELETE_NOTE = gql`
  mutation DeleteNote($id: Int!) {
    deleteNote(id: $id ) {
        id, 
        user_id,
        title,
      content, 
      is_delete,
      created_at
    }
  }
`;
const DeleteNotes = ({note}:{note: Note}) => {
     const [isOpen, setOpen] = React.useState(false)
    const session = useSession()
        const [message, setMessage] = React.useState<{
            message: string,
            type?: "error" | "sucess" | "none"
        }>()
     
        const [deleteNote, { loading }] = useMutation(DELETE_NOTE, {
            update(cache, { data }) {
            console.log(data)
              if (!data?.deleteNote) return;
          
              const existingNotes = cache.readQuery<{ notes: Note[] }>({
                query: GET_NOTES_BY_USER_ID,
                variables: { user_id: session.data?.user.id },
              });
          
              if (existingNotes) {
                cache.writeQuery<{ notes: Note[] }>({
                  query: GET_NOTES_BY_USER_ID,
                  variables: { user_id: session.data?.user.id },
                  data: {
                    notes: existingNotes.notes.filter(note => note.id !== data.deleteNote.id),
                  },
                });
              }
            },
            refetchQueries: [{ query: GET_NOTES_BY_USER_ID, variables: { user_id: session.data?.user.id } }], // Força atualização caso o cache falhe
          });
          

        async function handleDelete(){
            await deleteNote({ variables: { id: note.id } })
            setOpen(false)
            return setMessage({ message: 'Nota eleimindada com sucesso', type: "sucess" })
        }

        const handleMessagePopOut = ({ message, type }: { message: string, type: "none" | "error" | "sucess" | undefined }) => {
            if (type === "error") {
              return toast({
                title: "Oops!",
                description: message,
                variant: "destructive",
                duration: 80000
              });
            }
        
            if (type === "sucess") return toast({
              title: "Bem vindo de volta",
              description: message,
              variant: "default",
            });
          };
        
          React.useEffect(() => {
            if (message) {
              handleMessagePopOut({ message: message.message, type: message.type });
            }
          }, [message]);
    return (
        <Dialog open={isOpen} onOpenChange={setOpen} >
            <div className='p-0 w-full'>
                <button onClick={()=>setOpen(true)} className='w-ful flex justify-end'>
                    <Trash className='h-4 w-4 text-slate-500' />
                </button>
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem a certeza que deseja eliminar?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently
                        delete this file from our servers?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={handleDelete} >Eliminar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteNotes