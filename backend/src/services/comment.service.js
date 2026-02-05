const ticketRepository = require("../repositories/ticket.repository");
const commentRepository = require("../repositories/comment.repository");

async function addComment(ticketId, { authorName, message }) {
  // Ensure ticket exists
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  // Create comment
  return commentRepository.createComment({
    ticketId,
    authorName,
    message,
  });
}

module.exports = {
  addComment,
};
