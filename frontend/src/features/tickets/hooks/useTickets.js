import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTickets } from "../../../api/tickets.api";
import useTicketFiltersStore from "../../../store/ticketFilters.store";

export function useTickets(page = 1, limit = 3) {
  const { search, status, priority, sort } = useTicketFiltersStore();

  return useQuery({
    queryKey: ["tickets", { search, status, priority, sort, page, limit }],
    queryFn: () =>
      getTickets({
        q: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
        sort,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
}
