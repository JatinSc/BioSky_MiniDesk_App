const prisma = require("../lib/prisma");

async function createTicket(data) {
  return prisma.ticket.create({
    data,
  });
}

async function createTicket(data) {
  return prisma.ticket.create({ data });
}

async function getTickets({ where, orderBy, skip, take }) {
  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.ticket.count({ where }),
  ]);

  return { tickets, total };
}


async function getTicketById(id) {
  return prisma.ticket.findFirst({
    where: { id, isDeleted: false },
  });
}

async function getCommentsByTicketId(ticketId, { skip, take }) {
  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" },
      skip,
      take,
    }),
    prisma.comment.count({
      where: { ticketId },
    }),
  ]);

  return { comments, total };
}

async function updateTicketById(id, data) {
  return prisma.ticket.update({
    where: { id },
    data,
  });
}

async function softDeleteTicketById(id) {
  return prisma.ticket.update({
    where: { id },
    data: { isDeleted: true },
  });
}

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  getCommentsByTicketId,
  updateTicketById,
  softDeleteTicketById
};
