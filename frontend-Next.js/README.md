# 🔗 URL Shortener Frontend (Next.js + TypeScript)

This is the **frontend** of the URL Shortener Project.  
It provides user authentication, URL creation, and analytics visualization.  

---

# 🚀 Features

- User Authentication (Login, Register)
- Create Short URLs
- View Analytics (Daily clicks, devices,        browsers, sources)
- Responsive UI with TailwindCSS
- Secure cookie-based authentication
- Optimized API layer with Axios + React Query

---

## 📦 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Hook Form**
- **Axios**
- **Cookie-based Authentication**

---

# Setup Instructions

```bash
git clone <your-repo-url>
cd frontend-Next.js
npm install
# Create .env.local in project root
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_NODE_ENV=development
then
npm run dev
```

# Project Structure 

src/
 ├─ app/                # Next.js App Router pages 
 │   ├─ (auth)/
 │   ├─ home/
 │   ├─ dashboard/
 │   └─ ...
 ├─ components/         # Reusable UI components
 │   ├─ ui/
 │   └─ shared/
 ├─ hooks/              # Custom hooks (useAuth, useUrls, useAnalytics)
 ├─ lib/           # API request handlers (Axios)
 ├─ context/              # userContext functions

# API Documentation (Frontend → Backend)

# Authenication

POST /auth/register
Request: 
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

Response: 
{
  "success": true,
  "message": "Registered successfully"
}

POST /auth/login
Request:
{
  "email": "john@example.com",
  "password": "123456"
}

Response(cookie set):
{
  "accessToken": "Tdijf....."
}

GET /atuh/me
Request:
hearder -- need Bearer token

Response:
{
    "id": 1,
    "name": "Joe Doe",
    "email": "example@gmail.com",
    "refreshTokenHash": "$2b$12$tbcsvugs1NiBMhv6BejWUeo9XeizAuj7i.VWL9osNH00qK3.sYhL6",
    "createdAt": "2026-01-06T07:53:28.313Z"
}

# URL Shortening

POST /urls
Request:
need Bearer token in headed
{
  "originalUrl": "https://example.com"
}

Response: 
{
    "id": 26,
    "originalUrl": "long_url",
    "shortCode": "short-code",
    "clicks": 0,
    "user": {
        "id": 1
    },
    "createdAt": "2026-01-08T11:04:27.082Z"
}

GET /urls
need Bearer token in header

response:
[
    {
        "id": 26,
        "originalUrl": "original url",
        "shortCode": "shortCode",
        "clicks": 0,
        "createdAt": "2026-01-08T11:04:27.082Z"
    },
]

# Analytics

GET /analytics/urls/:id
need Bearer in header

response : 
{
    "success": true,
    "totalClicks": 0,
    "breakdown": {
        "daily": [{"date":"", "clicks:""}],
        "weekly": [{"date":"", "clicks:""}],
        "monthly": [{"date":"", "clicks:""}],
    },
    "insights": {
        "topVisitors": [],
        "topSources": [],
        "deviceDistribution": [],
        "browserUsage": []
    }
}


# Design Decisions

✔️ Next.js App Router

For server-side features, performance, and layout-based structure.

✔️ React Query

For caching API responses, auto-refetch, loading states, and cleaner async logic.

✔️ Modular Architecture

hooks/ contains all logical UI behavior

lib/ contains API calls

components/ contains UI blocks

✔️ Cookie-Based Auth

More secure than storing tokens in localStorage.

✔️ TailwindCSS

Ensures fast UI development with consistent styling.

# Known Limitations
UI can be enhanced further

# Author 

Name: Nowaj Chowdhury
Email: devnowajchowdhury@gmail.com






