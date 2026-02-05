import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "../../../api/tickets.api";
import { useNavigate } from "react-router-dom";

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      // Refresh tickets list
      queryClient.invalidateQueries(["tickets"]);

      // Navigate back to list
      navigate("/tickets");
    },
  });
}
