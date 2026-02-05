const ticketRepository = require("../repositories/ticket.repository");

async function createTicket({ title, description, priority }) {
  // business rules live here
  const ticket = await ticketRepository.createTicket({
    title,
    description,
    priority,
    status: "OPEN", // default as per requirement
  });

  return ticket;
}

async function getTickets(query) {
  const {
    q,
    status,
    priority,
    sort = "newest",
    page = 1,
    limit = 10,
  } = query;

  const where = {};

  // Search (title OR description)
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  // Filters
  if (status) where.status = status;
  if (priority) where.priority = priority;

  // Sorting
  const orderBy = {
    createdAt: sort === "oldest" ? "asc" : "desc",
  };

  // Pagination
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  return ticketRepository.getTickets({
    where,
    orderBy,
    skip,
    take,
  });
}

async function getTicketDetail(id, query) {
  const ticket = await ticketRepository.getTicketById(id);

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;

  const skip = (page - 1) * limit;
  const take = limit;

  const commentsResult = await ticketRepository.getCommentsByTicketId(
    id,
    { skip, take }
  );

  return {
    ticket,
    comments: commentsResult.comments,
    commentsMeta: {
      total: commentsResult.total,
      page,
      limit,
    },
  };
}

async function updateTicket(id, updateData) {
  const ticket = await ticketRepository.getTicketById(id);

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  return ticketRepository.updateTicketById(id, updateData);
}


module.exports = {
  createTicket,
  getTickets,
  getTicketDetail,
  updateTicket,
};
