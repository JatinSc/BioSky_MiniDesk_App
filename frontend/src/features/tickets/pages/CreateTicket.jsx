import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCreateTicket } from "../hooks/useCreateTicket";
import { useUpdateTicket } from "../hooks/useUpdateTicket";
import { useTicketDetail } from "../hooks/useTicketDetail";

export default function CreateTicket() {
  const { id } = useParams();
  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");

  const createTicket = useCreateTicket();
  const updateTicket = useUpdateTicket(id);
  const { data: ticketData, isLoading: isLoadingTicket } = useTicketDetail(id);

  // Load initial data for edit mode
  useEffect(() => {
    if (isEditMode && ticketData?.data?.ticket) {
      const ticket = ticketData.data.ticket;
      setTitle(ticket.title);
      setDescription(ticket.description);
      setPriority(ticket.priority);
    }
  }, [isEditMode, ticketData]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (title.length < 5) {
      return setError("Title must be at least 5 characters");
    }

    if (description.length < 20) {
      return setError(
        "Description must be at least 20 characters"
      );
    }

    if (isEditMode) {
      updateTicket.mutate({
        title,
        description,
        priority,
      });
      return; 
    }

    createTicket.mutate({
      title,
      description,
      priority,
    });
  }

  if (isEditMode && isLoadingTicket) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/tickets" className="hover:text-gray-900">Tickets</Link>
        <span>/</span>
        <span className="text-gray-900">{isEditMode ? "Edit Ticket" : "New Ticket"}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            {isEditMode ? "Edit Ticket" : "Create New Ticket"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode ? "Update the ticket details below." : "Please fill in the details below to open a new support ticket."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Ticket Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="e.g., Cannot access the system"
            />
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "LOW", label: "Low", color: "bg-green-50 text-green-700 border-green-200" },
                { value: "MEDIUM", label: "Medium", color: "bg-blue-50 text-blue-700 border-blue-200" },
                { value: "HIGH", label: "High", color: "bg-red-50 text-red-700 border-red-200" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    priority === option.value
                      ? `${option.color} ring-1 ring-offset-1`
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow min-h-[150px]"
              placeholder="Please describe the issue in detail..."
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              to="/tickets"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={createTicket.isPending || (isEditMode && updateTicket.isPending)}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {createTicket.isPending || (isEditMode && updateTicket.isPending) ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditMode ? "Update Ticket" : "Create Ticket"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
