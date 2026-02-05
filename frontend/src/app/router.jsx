import { Routes, Route, Navigate } from "react-router-dom";

import TicketsList from "../features/tickets/pages/TicketsList";
import TicketDetail from "../features/tickets/pages/TicketDetail";
import CreateTicket from "../features/tickets/pages/CreateTicket";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tickets" />} />
      <Route path="/tickets" element={<TicketsList />} />
      <Route path="/tickets/new" element={<CreateTicket />} />
      <Route path="/tickets/:id/edit" element={<CreateTicket />} />
      <Route path="/tickets/:id" element={<TicketDetail />} />
    </Routes>
  );
}

export default Router;
    