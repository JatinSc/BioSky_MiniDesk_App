import { useParams } from "react-router-dom";
import { useState } from "react";

import { useTicketDetail } from "../hooks/useTicketDetail";
import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";
import { useAddComment } from "../hooks/useAddComment";

import StatusBadge from "../components/StatusBadge";

export default function TicketDetail() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState("");

  const { data, isLoading, isError } = useTicketDetail(id, page);
  const updateStatus = useUpdateTicketStatus(id);
  const addComment = useAddComment(id);

  if (isLoading) {
    return (
      <p className="p-6 text-gray-500">Loading ticket...</p>
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
  const commentsMeta = data.meta.comments;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Ticket Header */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-semibold">
            {ticket.title}
          </h1>
          <StatusBadge status={ticket.status} />
        </div>

        <p className="mt-4 text-gray-700">
          {ticket.description}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Priority: {ticket.priority}
          </span>

          <select
            value={ticket.status}
            onChange={(e) =>
              updateStatus.mutate(e.target.value)
            }
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">
              In Progress
            </option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="font-semibold mb-4">
          Comments
        </h2>

        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 border rounded"
            >
              <p className="text-sm font-medium">
                {c.authorName}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {c.message}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={
              page * commentsMeta.limit >=
              commentsMeta.total
            }
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Comment */}
      <div className="mt-8 bg-white p-4 border rounded">
        <h3 className="font-medium mb-2">
          Add Comment
        </h3>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-2 text-sm"
          rows={3}
          placeholder="Write a comment..."
        />

        <button
          onClick={() => {
            addComment.mutate({
              authorName: "User",
              message: comment,
            });
            setComment("");
          }}
          disabled={addComment.isLoading}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
