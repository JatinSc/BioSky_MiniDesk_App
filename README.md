# BioSky Mini Support Desk

BioSky Mini Support Desk is a modern, full-stack ticket management application designed to streamline support operations. It features a clean, responsive user interface and a robust, scalable backend architecture.

### deployed at: https://biosky-minidesk-app-h1ya.onrender.com/

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, TanStack Query, Zustand, Vite
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod

## 🛠️ Setup & Installation

### Prerequisites for local setup
- Node.js (v18+)
- PostgreSQL installed and running locally (required for local development)

### 1. Clone the repository
```bash
git clone <repository-url>
cd BioSky_MiniDesk_App
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/biosky_db"
```

Run migrations and seed the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:4000
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

---

## 📚 API Documentation (REST)

The backend exposes a RESTful API. All responses follow a consistent JSON structure.

- **Base URL (local):** `http://localhost:4000`
- **Base URL (production):** `https://<backend-service>.onrender.com`

### Health Check

**GET** `/health`

Description: Used to verify server availability.

**Response:**
```json
{
  "status": "ok"
}
```

### Tickets API

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

### Comments API

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
