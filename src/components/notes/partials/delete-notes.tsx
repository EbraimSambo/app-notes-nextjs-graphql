"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { gql, useMutation } from '@apollo/client';
import { Trash } from 'lucide-react';
import React from 'react';
import { GET_NOTES_BY_USER_ID } from '../hooks/get-notes';
import { Note } from '@/config/core/interfaces';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import { useDeleteNote } from '../hooks/use-delete-note';
import Loader from '@/components/custom/loader';

const DELETE_NOTE = gql`
  mutation DeleteNote($id: Int!) {
    deleteNote(id: $id) {
      id,
      user_id,
      title,
      content,
      is_delete,
      created_at
    }
  }
`;

const DeleteNotes = ({ note }: { note: Note }) => {
  const [isOpen, setOpen] = React.useState(false);
  const { handleDelete, loading, message } = useDeleteNote();

  const handleMessagePopOut = ({ message, type }: { message: string, type: "none" | "error" | "success" | undefined }) => {
    if (type === "error") {
      return toast({
        title: "Oops!",
        description: message,
        variant: "destructive",
        duration: 8000
      });
    }

    if (type === "success") {
      return toast({
        title: "Sucesso!",
        description: message,
        variant: "default",
      });
    }
  };

  React.useEffect(() => {
    if (message) {
      handleMessagePopOut({ message: message.message, type: message.type });
    }
  }, [message]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <div className='p-0 w-full'>
        <button onClick={() => setOpen(true)} className='w-full flex justify-end'>
          <Trash className='h-4 w-4 text-slate-500' />
        </button>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem a certeza que deseja eliminar?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Tem a certeza que deseja eliminar permanentemente esta nota?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} onClick={()=>handleDelete(note.id)}>
          {!loading ? "Eliminar" :
                  <Loader atributes={{
                      color: "#fff"
                    }} />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNotes;
