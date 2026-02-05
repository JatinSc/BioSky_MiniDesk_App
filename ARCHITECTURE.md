# BioSky Mini Support Desk — Architecture Overview

This document describes the overall architecture, backend API design, and data flow of the BioSky Mini Support Desk application. The system is designed with scalability, separation of concerns, and real-world deployment practices in mind.

## 1. High-Level Architecture

The application follows a client–server architecture with a clear separation between frontend, backend, and database layers.

```
+-------------------------------+          +-------------------------------------+
|  Frontend (React + Tailwind)  |          |  Backend API (Node.js + Express)    |
|                               |--(HTTP)-->|                                     |
+-------------------------------+          +-------------------------------------+
                                                          |
                                                          | (Prisma ORM)
                                                          v
                                           +-------------------------------------+
                                           |      Database (PostgreSQL)          |
                                           +-------------------------------------+
```

### Key Characteristics
- **Frontend and backend are fully decoupled**
- **Backend is stateless and horizontally scalable**
- **Database is managed separately** using a managed PostgreSQL service
- **Environment-specific configuration** is handled via environment variables

## 2. Backend Architecture

The backend follows a layered architecture to ensure maintainability and testability.

`Routes` → `Controllers` → `Services` → `Repositories` → `Database`

### Layer Responsibilities

#### Routes
- Define API endpoints and HTTP methods
- Map requests to controllers
- **No business logic**

#### Controllers
- Handle HTTP-specific logic (request/response)
- Validate input using **Zod**
- Forward execution to service layer
- Delegate error handling to global middleware

#### Services
- Contain business logic
- Enforce application rules (e.g., ticket existence, soft delete checks)
- Coordinate between repositories

#### Repositories
- Handle all database access via **Prisma ORM**
- No business or HTTP logic
- Fully reusable and isolated

#### Global Middleware
- Centralized error handling
- Consistent JSON error responses
- Prevents leaking stack traces in production

## 3. Database Design

### Database
- **PostgreSQL**
- Managed service in production (e.g., Render PostgreSQL)

### ORM
**Prisma** is used for:
- Schema definition
- Type-safe queries
- Migrations

### Core Models

#### Ticket
Represents a support ticket. Soft deletion implemented using `isDeleted` flag.

**Key fields:**
- `id`
- `title`
- `description`
- `status` (OPEN, IN_PROGRESS, RESOLVED)
- `priority` (LOW, MEDIUM, HIGH)
- `createdAt`, `updatedAt`
- `isDeleted`

#### Comment
Represents discussion on a ticket. Linked to a ticket via foreign key.

**Key fields:**
- `id`
- `ticketId`
- `authorName`
- `message`
- `createdAt`

### Soft Delete Strategy
Tickets are not physically deleted from the database. Instead, an `isDeleted` flag is used.

**Benefits:**
- Prevents accidental data loss
- Enables future recovery or auditing
- Matches real-world production systems

All read queries explicitly exclude soft-deleted records.

## 4. API Documentation (REST)

The backend exposes a RESTful API. All responses follow a consistent JSON structure.

- **Base URL (local):** `http://localhost:4000`
- **Base URL (production):** `https://<backend-service>.onrender.com`

### 4.1 Health Check

**GET** `/health`

Description: Used to verify server availability.

**Response:**
```json
{
  "status": "ok"
}
```

### 4.2 Tickets API

#### Create Ticket
**POST** `/tickets`

**Request Body:**
```json
{
  "title": "Unable to login",
  "description": "I am unable to login using my email and password.",
  "priority": "HIGH"
}
```

**Response – 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Unable to login",
    "description": "...",
    "status": "OPEN",
    "priority": "HIGH",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### List Tickets (Search, Filter, Sort, Pagination)
**GET** `/tickets`

**Query Parameters:**
| Name | Description |
|------|-------------|
| `q` | Search by title or description |
| `status` | Filter by status |
| `priority` | Filter by priority |
| `sort` | `newest` or `oldest` |
| `page` | Page number |
| `limit` | Items per page |

**Response:**
```json
{
  "success": true,
  "data": [ ...tickets ],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 10
  }
}
```

#### Get Ticket Details
**GET** `/tickets/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "ticket": { ... },
    "comments": [ ... ]
  },
  "meta": {
    "comments": {
      "total": 3,
      "page": 1,
      "limit": 5
    }
  }
}
```
*Returns 404 if ticket does not exist or is soft-deleted.*

#### Update Ticket
**PATCH** `/tickets/:id`

**Request Body (partial allowed):**
```json
{
  "status": "IN_PROGRESS"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updatedTicket }
}
```

#### Delete Ticket (Soft Delete)
**DELETE** `/tickets/:id`

**Response:**
- Status: `204 No Content`
- Ticket is marked as deleted but remains in the database.

### 4.3 Comments API

#### Add Comment
**POST** `/tickets/:id/comments`

**Request Body:**
```json
{
  "authorName": "User",
  "message": "I am still facing this issue."
}
```

**Response – 201:**
```json
{
  "success": true,
  "data": { ...comment }
}
```
*Returns 404 if the ticket does not exist.*

## 5. Scalability Considerations

The system is designed to scale gradually as data volume and usage grow.

### Large Ticket Lists
- **Tickets are never fetched all at once.**
- All list endpoints use **server-side pagination** with `page` and `limit` parameters.
- Only the required subset of tickets is returned per request.
- Soft-deleted tickets are excluded at the query level to avoid unnecessary data processing.

This ensures predictable performance even as the number of tickets grows.

### Search Performance
Search is implemented at the database level using indexed fields.
- Queries use `WHERE` conditions with `contains` on title and description.
- **Indexes** are added on commonly queried fields such as:
  - `status`
  - `priority`
  - `createdAt`
  - `isDeleted`

**For future scale**, the design can be extended to:
- Full-text search using PostgreSQL `tsvector`
- Dedicated search services (e.g., Elasticsearch)

The current approach balances performance and simplicity for the expected data size.

### Pagination Strategy
Pagination is handled entirely on the backend using:
- `skip` and `take` (Prisma)
- A separate count query for total records
- Metadata (`total`, `page`, `limit`) is returned to the frontend to support UI pagination.

This avoids loading unnecessary data and keeps frontend memory usage low.

## 6. Reliability

### Error Handling Strategy
A global error handling middleware is used in the backend.
- All errors are returned as **structured JSON responses**.
- HTTP status codes are explicitly set (400, 404, 500).

**Example error response:**
```json
{
  "success": false,
  "message": "Ticket not found"
}
```

This ensures:
- Consistent error responses
- No leaking of internal stack traces in production

### Validation
Request validation is performed using **Zod** at the controller layer.
- Invalid inputs are rejected before reaching the service or database layers.
- Partial updates (PATCH) validate only the provided fields.

**Validation rules cover:**
- Required fields
- Field length limits
- Enum values
- Empty update requests

### Edge Case Handling
The system explicitly handles common edge cases:
- Accessing non-existent or soft-deleted tickets
- Empty ticket lists
- Invalid query parameters
- Empty update payloads
- Comment creation on invalid tickets

Each case returns a meaningful error message with an appropriate HTTP status.

## 7. Tradeoffs

### What Was Intentionally Skipped

#### Authentication & Authorization
- No user authentication (login/signup) was implemented.
- The system assumes a trusted environment for simplicity.
- **Reason:** The assignment focuses on backend architecture, API design, and data handling rather than user management.

#### Real-Time Updates
- No WebSocket or real-time updates were added.
- Ticket updates require a page refresh or refetch.
- **Reason:** Polling and refetching via React Query is sufficient for the expected scale.

#### Advanced Search Infrastructure
- Full-text search engines were not integrated.
- No fuzzy matching or ranking.
- **Reason:** PostgreSQL-based search is adequate for small-to-medium datasets and keeps the system lightweight.

#### Role-Based Access Control
- All users can create, update, and comment on tickets.
- **Reason:** RBAC would add significant complexity without being required by the assignment.

### Tradeoff Summary
The implementation prioritizes:
- **Clarity** over premature optimization
- **Realistic production patterns** over unnecessary features
- **A strong architectural foundation** that can be extended later

## 8. Frontend Architecture (Summary)

The frontend is built using:
- **React**
- **Tailwind CSS** (styling)
- **TanStack Query** (server state)
- **Zustand** (UI/client state)

### State Management Strategy
- **Server data (tickets, comments)** → TanStack Query
- **UI state (filters, search, sorting)** → Zustand

This avoids unnecessary global state and keeps responsibilities clear.

## 9. Environment & Deployment

### Environment Variables
All sensitive configuration is handled via environment variables.

**Example:**
```env
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<db>
```

### Migrations Strategy

**Local development:**
```bash
prisma migrate dev
prisma db seed
```

**Production:**
```bash
prisma migrate deploy
```
*Seed data is development-only and not applied in production.*

## 10. Key Design Decisions

- **Layered backend architecture** for scalability
- **Soft delete** instead of hard delete
- **Prisma ORM** for schema safety and migrations
- **Separate client and server state** on frontend
- **Managed PostgreSQL** for production reliability

## 11. Conclusion

The BioSky Mini Support Desk application is designed to reflect real-world production practices, emphasizing clean architecture, maintainability, and clear separation of concerns across the stack.
