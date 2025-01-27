import { DocumentNode, gql, useMutation } from '@apollo/client';
import React from 'react';
import { GET_NOTES_BY_USER_ID } from './get-notes';
import { Note } from '@/config/core/interfaces';
import { toast } from '@/hooks/use-toast';

const DELETE_NOTE = gql`
  mutation DeleteNote($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export function useDeleteNote() {
  const [message, setMessage] = React.useState<{
    message: string;
    type?: 'error' | 'success' | 'none';
  }>();

  const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE, {
    update(cache, { data }) {
      if (!data?.deleteNote) return;
  
      cache.evict({ id: cache.identify({ id: data.deleteNote.id, __typename: 'Note' }) });
    },
  });

  async function handleDelete(id: number) {
    setMessage({ message: '', type: undefined });

    try {
      await deleteNote({ variables: { id } });

      setMessage({ message: 'Nota deletada com sucesso', type: 'success' });

      toast({
        title: 'Sucesso!',
        description: 'A nota foi deletada.',
        variant: 'default',
      });
    } catch (err) {
      console.log(error);

      // Tratar erros
      if (error?.networkError) {
        setMessage({ message: 'Erro de conexão, tente novamente.', type: 'error' });
        toast({
          title: 'Erro',
          description: 'Erro de conexão, tente novamente.',
          variant: 'destructive',
        });
      } else {
        setMessage({ message: error?.message || 'Ocorreu um erro inesperado', type: 'error' });
        toast({
          title: 'Erro',
          description: error?.message || 'Ocorreu um erro inesperado.',
          variant: 'destructive',
        });
      }
    }
  }

  return {
    handleDelete,
    loading,
    message,
  };
}
