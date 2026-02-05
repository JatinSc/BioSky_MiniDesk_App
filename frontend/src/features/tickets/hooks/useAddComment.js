import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../../api/tickets.api";
import toast from "react-hot-toast";

export function useAddComment(ticketId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addComment(ticketId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["ticket", ticketId]);
      toast.success("Comment added successfully!");
    },
    onError: () => {
      toast.error("Failed to add comment.");
    },
  });
}
