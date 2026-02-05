import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket } from "../../../api/tickets.api";

export function useUpdateTicketStatus(ticketId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status) =>
      updateTicket(ticketId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["ticket", ticketId]);
      queryClient.invalidateQueries(["tickets"]);
    },
  });
}
