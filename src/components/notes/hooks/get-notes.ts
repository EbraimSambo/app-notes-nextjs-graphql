import { Note } from "@/config/core/interfaces";
import { DocumentNode, gql, useQuery } from "@apollo/client";

export const GET_NOTES_BY_USER_ID: DocumentNode = gql`
  query  notes($user_id: Int!) {
    notes(user_id: $user_id) {
        id,
        content,
        title,
        created_at,
        is_delete,
    }
  }
`;

export function useGetNotes(user_id: number) {
  return useQuery<{ notes: Note[] }>(GET_NOTES_BY_USER_ID, {
    variables: { user_id },
    skip: !user_id,
  });
}


export const GET_NOTES_DELETED_BY_USER_ID: DocumentNode = gql`
  query  NotesDeleted($user_id: Int!) {
      notesDeleted(user_id: $user_id) {
        id,
        content,
        title,
        created_at,
        is_delete,
    }
  }
`;

export function useGetNotesDeleted(user_id: number) {
  return useQuery<{ notesDeleted: Note[] }>(GET_NOTES_DELETED_BY_USER_ID, {
    variables: { user_id },
    skip: !user_id,
  });
}