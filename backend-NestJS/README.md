# 🔗 URL Shortener Backend (NestJS + MySQL)

This is the **backend API** for the URL Shortener Application.  
It provides authentication, URL shortening, and analytics tracking.  
The project is built with **NestJS**, **MySQL**, **TypeORM**, and follows a modular architecture.

---

# Features

- User Authentication (Register, Login)
- URL Shortening (Generate short codes)
- Analytics Tracking
  - Daily clicks, weekly clicks, Monthly clicks
  - Device type
  - Browser usage
  - Source tracking (referrer)
- Secure cookie-based authentication
- Clean Modular Architecture (auth, urls, analytics, users, common, utils)

---

# Setup Instructions

## Clone the Repository
```bash
git clone <your-backend-repo-url>
cd backend-NestJS
npm install
```
# Now create .env file in projcet root

PORT=3002
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=url_shortener

JWT_ACCESS_SECRET=jwt_secret_here
JWT_REFRESH_SECRET=jwt_secret_here

# Setup Database

I'm useing XAMPP

Create a MySQL database:
```bash
CREATE DATABASE url_shortener;

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod


# Project Structure

src/
 ├─ analytics/            # Handle analytics logging & analytics API
 ├─ auth/                 # Login, Register, Guards, Strategies
 ├─ common/               # Decorators, interceptors, guards
 ├─ config/               # TypeORM & application config
 ├─ urls/                 # URL creation, redirection, URL module
 ├─ users/                # User module, service, entity
 ├─ utils/                # Helper utilities (cookie, hashing)
 ├─ app.module.ts         # Root module
 ├─ main.ts               # App bootstrap


# API Documentation
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

Design Decisions
✔️ NestJS Modular Architecture

Each feature (auth, urls, analytics) lives in its own module for maintainability.

✔️ TypeORM ORM + MySQL

Easy migrations, models, and relationships.

✔️ Analytics stored per-click

For accurate insights:

device

browser

IP

referrer

✔️ Middleware for Logging Analytics

When a short URL is accessed → analytics entry created.

✔️ Cookie-based authentication

More secure than local storage, protected on the server side.

# Author 

Name: Nowaj Chowdhury
Email: devnowajchowdhury@gmail.com