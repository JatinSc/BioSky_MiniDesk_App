# BioSky Mini Support Desk — Architecture Overview

This document describes the overall architecture, backend API design, and data flow of the BioSky Mini Support Desk application. The system is designed with scalability, separation of concerns, and real-world deployment practices in mind.

## 1. High-Level Architecture

The application follows a client–server architecture with a clear separation between frontend, backend, and database layers.

```mermaid
graph TD
    Frontend["Frontend (React + Tailwind)"] -->|HTTP (REST)| Backend["Backend API (Node.js + Express)"]
    Backend -->|Prisma ORM| Database["PostgreSQL Database"]
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

## 5. Frontend Architecture (Summary)

The frontend is built using:
- **React**
- **Tailwind CSS** (styling)
- **TanStack Query** (server state)
- **Zustand** (UI/client state)

### State Management Strategy
- **Server data (tickets, comments)** → TanStack Query
- **UI state (filters, search, sorting)** → Zustand

This avoids unnecessary global state and keeps responsibilities clear.

## 6. Environment & Deployment

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

## 7. Key Design Decisions

- **Layered backend architecture** for scalability
- **Soft delete** instead of hard delete
- **Prisma ORM** for schema safety and migrations
- **Separate client and server state** on frontend
- **Managed PostgreSQL** for production reliability

## 8. Conclusion

The BioSky Mini Support Desk application is designed to reflect real-world production practices, emphasizing clean architecture, maintainability, and clear separation of concerns across the stack.
