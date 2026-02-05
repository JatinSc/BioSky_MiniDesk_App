import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket } from "../../../api/tickets.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateTicket(ticketId) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) =>
      updateTicket(ticketId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["ticket", ticketId]);
      queryClient.invalidateQueries(["tickets"]);
      toast.success("Ticket updated successfully!");
      navigate(`/tickets/${ticketId}`);
    },
    onError: () => {
      toast.error("Failed to update ticket.");
    },
  });
}
