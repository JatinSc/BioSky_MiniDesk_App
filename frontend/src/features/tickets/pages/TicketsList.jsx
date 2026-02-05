import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import TicketCard from "../components/TicketCard";
import TicketFilters from "../components/TicketFilters";
import Pagination from "../../../components/Pagination";
import useTicketFiltersStore from "../../../store/ticketFilters.store";

export default function TicketsList() {
  const [page, setPage] = useState(1);
  const { search, status, priority, sort } = useTicketFiltersStore();
  const { data, isLoading, isError } = useTickets(page);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, status, priority, sort]);

  const totalPages = data?.meta ? Math.ceil(data.meta.total / data.meta.limit) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
        <Link
          to="/tickets/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <span>New ticket</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-transparent">
        <TicketFilters />
      </div>

      {/* Content */}
      <div className="mt-6">
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            Failed to load tickets. Please try again later.
          </div>
        )}

        {!isLoading && data?.data?.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 mb-4">No tickets found</p>
            <Link
              to="/tickets/new"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first ticket
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {data?.data?.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        {!isLoading && data?.meta && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
