import api from "./axios";

// CREATE TICKET
export const createTicket = async (data) => {
  const res = await api.post("/tickets", data);
  return res.data.data;
};

// GET TICKETS LIST
export const getTickets = async (params) => {
  const res = await api.get("/tickets", { params });
  return res.data;
};

// GET TICKET DETAIL
export const getTicketDetail = async (id, params) => {
  const res = await api.get(`/tickets/${id}`, { params });
  return res.data;
};

// ADD COMMENT
export const addComment = async (ticketId, data) => {
  const res = await api.post(`/tickets/${ticketId}/comments`, data);
  return res.data.data;
};

// UPDATE TICKET
export const updateTicket = async (ticketId, data) => {
  const res = await api.patch(`/tickets/${ticketId}`, data);
  return res.data.data;
};

// DELETE TICKET
export const deleteTicket = async (ticketId) => {
  await api.delete(`/tickets/${ticketId}`);
};
