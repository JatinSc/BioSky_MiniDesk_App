const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const commentController = require("../controllers/comment.controller");



// later: controllers will be added here
router.post("/", ticketController.createTicket);
router.get("/", ticketController.getTickets);
router.get("/:id", ticketController.getTicketDetail);
router.post("/:id/comments", commentController.addComment);
router.patch("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);




module.exports = router;
