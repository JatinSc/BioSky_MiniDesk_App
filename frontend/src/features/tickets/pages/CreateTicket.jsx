import { useState } from "react";
import { useCreateTicket } from "../hooks/useCreateTicket";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");

  const createTicket = useCreateTicket();

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

    createTicket.mutate({
      title,
      description,
      priority,
    });
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Create Ticket
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Short summary of the issue"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            rows={5}
            placeholder="Describe the issue in detail"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={createTicket.isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
        >
          {createTicket.isLoading
            ? "Creating..."
            : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}
