
---

## Frontend Repository (BookMyTicket UI)

### Live Demo

Frontend (Vercel): `https://seat-reservation-assessment-ui.vercel.app/`

### Tech Stack

* React + Vite
* TypeScript
* Tailwind CSS
* (Optional) Axios / Fetch for API calls

---

## Local Setup & Run

### 1) Prerequisites

* Node.js **18+** (recommended)
* npm (or yarn/pnpm)

### 2) Install & Run

```bash
git clone <GITHUB_FRONTEND_REPO_URL>
cd <frontend-folder>

npm install
npm run dev
```

Open:

* `http://localhost:5173`

### 3) Build & Preview

```bash
npm run build
npm run preview
```

---

## Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

If backend is deployed (Render/Railway/etc), set it like:

```env
VITE_API_BASE_URL=https://<your-backend-domain>/api
```

---

## Architecture Diagram

```mermaid
flowchart LR
    U[User Browser] --> UI[BookMyTicket UI<br/>React + Vite]
    UI --> API[BookMyTicket API<br/>Express + TypeScript]
    API --> DB[(PostgreSQL<br/>Neon Serverless)]
```

---

## API Integration Flow

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant UI as Frontend (React)
    participant API as Backend API (Express)
    participant DB as PostgreSQL (Neon)

    U->>UI: Open Home
    UI->>API: GET /api/movies
    API->>DB: SELECT movies + shows
    DB-->>API: rows
    API-->>UI: JSON list
    UI-->>U: Render movies + showtimes

    U->>UI: Select show
    UI->>API: GET /api/seats/by-show/:showId
    API->>DB: SELECT seats + reservation status
    DB-->>API: rows
    API-->>UI: JSON seat list
    UI-->>U: Render seats (available/booked)

    U->>UI: Confirm booking
    UI->>API: POST /api/reservations
    API->>DB: INSERT reservation + items
    DB-->>API: success / unique constraint fail
    API-->>UI: 201 or 409 ALREADY_RESERVED
    UI-->>U: Show success / error message
```

---

