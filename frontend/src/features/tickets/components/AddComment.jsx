import { useState, useEffect } from "react";
import { useAddComment } from "../hooks/useAddComment";
import Modal from "../../../components/Modal";

export default function AddComment({ ticketId, isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [authorName, setAuthorName] = useState("Sophie Minders");
  const [error, setError] = useState("");
  const addComment = useAddComment(ticketId);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setMessage("");
      setError("");
      // We keep authorName as is, or reset to default if needed
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!authorName.trim()) {
      return setError("Author name cannot be empty");
    }

    if (!message.trim()) {
      return setError("Comment cannot be empty");
    }

    addComment.mutate(
      { 
        message,
        authorName 
      },
      {
        onSuccess: () => {
          setMessage("");
          onClose();
        },
      }
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a Comment">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
            rows={4}
            placeholder="Type your comment here..."
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={addComment.isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {addComment.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting...
              </>
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
