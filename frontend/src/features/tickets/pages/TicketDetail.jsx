import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { useTicketDetail } from "../hooks/useTicketDetail";
import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";

import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import AddComment from "../components/AddComment";
import Pagination from "../../../components/Pagination";

export default function TicketDetail() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const { data, isLoading, isError } = useTicketDetail(id);
  const updateStatus = useUpdateTicketStatus(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Failed to load ticket
      </p>
    );
  }

  const { ticket, comments } = data.data;

  // Client-side pagination
  const commentsPerPage = 3;
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const paginatedComments = comments.slice((page - 1) * commentsPerPage, page * commentsPerPage);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/tickets" className="hover:text-gray-900">Tickets</Link>
        <span>/</span>
        <span className="text-gray-900">#{ticket.id.substring(0, 6).toUpperCase()}</span>
      </div>

      {/* Ticket Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {ticket.title}
          </h1>
          <div className="flex gap-2">
            <select
              value={ticket.status}
              onChange={(e) =>
                updateStatus.mutate(e.target.value)
              }
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <Link
              to={`/tickets/${ticket.id}/edit`}
              className="bg-white px-6 py-1 border border-gray-200 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
            >
              Edit
            </Link>
          </div>

        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {ticket.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {/* <span className="text-sm text-gray-500">Priority</span> */}
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>



          <div className="ml-auto text-sm text-gray-400">
            Created on {new Date(ticket.createdAt).toLocaleDateString()}
          </div>


        </div>
      </div>

      {/* Comments Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Comments ({comments.length})
          </h2>
          <button
            onClick={() => setIsCommentModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Comment
          </button>
        </div>

        {/* Comment Modal */}
        <AddComment
          ticketId={ticket.id}
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
        />

        {/* Comments List */}
        <div className="space-y-4">
          {paginatedComments.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 border border-gray-200 rounded-xl"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                    {c.authorName?.charAt(0) || "U"}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {c.authorName || "Unknown User"}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed pl-8">
                {c.message}
              </p>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-gray-500 text-sm italic text-center py-4">No comments yet. Be the first to start the conversation.</p>
          )}
        </div>

        {/* Pagination */}
        {comments.length > commentsPerPage && (
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
