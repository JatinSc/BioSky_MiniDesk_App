import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../../api/tickets.api";
import useTicketFiltersStore from "../../../store/ticketFilters.store";

export function useTickets() {
  const { search, status, priority, sort } = useTicketFiltersStore();

  return useQuery({
    queryKey: ["tickets", { search, status, priority, sort }],
    queryFn: () =>
      getTickets({
        q: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
        sort,
        page: 1,
        limit: 10,
      }),
    keepPreviousData: true,
  });
}
