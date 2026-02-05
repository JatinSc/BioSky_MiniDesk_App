const { createTicketSchema } = require("../validators/ticket.validator");
const ticketService = require("../services/ticket.service");
const { updateTicketSchema } = require("../validators/ticket.validator");

async function createTicket(req, res, next) {
  try {
    // validate request body
    const validatedData = createTicketSchema.parse(req.body);

    const ticket = await ticketService.createTicket(validatedData);

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    // Zod errors or others go to global error handler
    error.statusCode = 400;
    next(error);
  }
}

async function getTickets(req, res, next) {
  try {
    const result = await ticketService.getTickets(req.query);

    res.json({
      success: true,
      data: result.tickets,
      meta: {
        total: result.total,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getTicketDetail(req, res, next) {
  try {
    const { id } = req.params;

    const result = await ticketService.getTicketDetail(id, req.query);

    res.json({
      success: true,
      data: {
        ticket: result.ticket,
        comments: result.comments,
      },
      meta: {
        comments: result.commentsMeta,
      },
    });
  } catch (error) {
    next(error);
  }
}


async function updateTicket(req, res, next) {
  try {
    const { id } = req.params;

    const validatedData = updateTicketSchema.parse(req.body);

    const updatedTicket = await ticketService.updateTicket(
      id,
      validatedData
    );

    res.json({
      success: true,
      data: updatedTicket,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      error.statusCode = 400;
    }
    next(error);
  }
}

async function deleteTicket(req, res, next) {
  try {
    const { id } = req.params;

    await ticketService.deleteTicket(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}



module.exports = {
  createTicket,
  getTickets,
  getTicketDetail,
  updateTicket,
  deleteTicket
};
