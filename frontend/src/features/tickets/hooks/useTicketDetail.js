import { useQuery } from "@tanstack/react-query";
import { getTicketDetail } from "../../../api/tickets.api";

export function useTicketDetail(ticketId) {
  return useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () =>
      getTicketDetail(ticketId, { page: 1, limit: 1000 }),
    enabled: !!ticketId,
  });
}
