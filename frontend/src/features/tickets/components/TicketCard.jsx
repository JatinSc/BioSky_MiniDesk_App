import { Link } from "react-router-dom";

function StatusBadge({ status }) {
  const colors = {
    OPEN: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    RESOLVED: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded ${colors[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const colors = {
    LOW: "bg-gray-100 text-gray-700",
    MEDIUM: "bg-orange-100 text-orange-700",
    HIGH: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded ${colors[priority]}`}
    >
      {priority}
    </span>
  );
}

export default function TicketCard({ ticket }) {
  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="block border rounded-lg p-4 hover:shadow-sm bg-white"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">
          {ticket.title}
        </h3>
        <StatusBadge status={ticket.status} />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <PriorityBadge priority={ticket.priority} />
        <span className="text-sm text-gray-500">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
