import { useQuery } from "@tanstack/react-query";
import { getTicketDetail } from "../../../api/tickets.api";

export function useTicketDetail(ticketId, page = 1, limit = 5) {
  return useQuery({
    queryKey: ["ticket", ticketId, page],
    queryFn: () =>
      getTicketDetail(ticketId, { page, limit }),
    enabled: !!ticketId,
  });
}
