import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return "Just now";
  }
}

export default function TicketCard({ ticket }) {
  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
          {ticket.title}
        </h3>
        <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
          {timeAgo(ticket.createdAt)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {ticket.description}
      </p>

      <div className="flex items-center gap-3">
        <PriorityBadge priority={ticket.priority} />
        
        <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          #{ticket.id.substring(0, 6).toUpperCase()}
        </span>

        <div className="ml-auto">
           <StatusBadge status={ticket.status} />
        </div>
      </div>
    </Link>
  );
}
