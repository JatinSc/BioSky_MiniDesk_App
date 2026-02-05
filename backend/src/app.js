const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const ticketRoutes = require("./routes/ticket.routes");
const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Ticket routes
app.use("/tickets", ticketRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use(errorHandler);


module.exports = app;
