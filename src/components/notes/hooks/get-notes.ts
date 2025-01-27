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