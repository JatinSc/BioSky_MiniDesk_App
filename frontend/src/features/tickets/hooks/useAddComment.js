import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../../api/tickets.api";

export function useAddComment(ticketId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addComment(ticketId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["ticket", ticketId]);
    },
  });
}
