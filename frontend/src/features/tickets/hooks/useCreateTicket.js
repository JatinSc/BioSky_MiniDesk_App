import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "../../../api/tickets.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      // Refresh tickets list
      queryClient.invalidateQueries(["tickets"]);
      toast.success("Ticket created successfully!");

      // Navigate back to list
      navigate("/tickets");
    },
    onError: () => {
      toast.error("Failed to create ticket.");
    },
  });
}
