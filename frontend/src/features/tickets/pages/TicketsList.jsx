import { Link } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import TicketCard from "../components/TicketCard";
import TicketFilters from "../components/TicketFilters";

export default function TicketsList() {
  const { data, isLoading, isError } = useTickets();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Support Tickets</h1>
        <Link
          to="/tickets/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          + Create Ticket
        </Link>
      </div>

      <TicketFilters />

      <div className="mt-6 space-y-4">
        {isLoading && (
          <p className="text-gray-500">Loading tickets...</p>
        )}

        {isError && (
          <p className="text-red-600">Failed to load tickets</p>
        )}

        {!isLoading &&
          data?.data?.length === 0 && (
            <p className="text-gray-500">
              No tickets found
            </p>
          )}

        {data?.data?.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
