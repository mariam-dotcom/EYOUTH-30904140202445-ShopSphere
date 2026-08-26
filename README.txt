ShopSphere - Full-Stack E-Commerce Project (Production Deployment)
====================================================================

Student ID: EYOUTH-30904140202445
Repository: https://github.com/mariam-dotcom/EYOUTH-30904140202445-ShopSphere

This project takes an existing full-stack e-commerce application (React
frontend, Node/Express backend, PostgreSQL + MongoDB) and deploys it to
a real production environment, connects it to production databases,
secures it, and monitors it - as required for the Production Deployment
task of the ShopSphere Enterprise Production and Cloud Modernization
project.

1. TECHNOLOGIES USED
---------------------
* Frontend: React (Vite), React Router, Axios, Context API, TanStack React Query, Tailwind CSS.
* Backend: Node.js, Express (controller -> service -> Prisma layering), deployed as a Vercel serverless function.
* Relational DB: PostgreSQL, hosted on Supabase (production).
* NoSQL DB: MongoDB, hosted on MongoDB Atlas (production).
* File Storage: Supabase Storage (product images).
* Security: Helmet, CORS, express-rate-limit - all active on the deployed backend.
* Hosting: Vercel (frontend and backend deployed as two separate projects).
* Monitoring: UptimeRobot, registered on the backend health-check endpoint.
* Tests: Jest + Supertest (backend), Vitest + React Testing Library + MSW (frontend).
* Containerization (local dev only): Docker, Docker Compose.

2. PROJECT URLS
-----------------
Production:
* Frontend:     https://eyouth-30904140202445-shop-sphere-b.vercel.app
* Backend:      https://eyouth-30904140202445-shop-sphere.vercel.app
* Health Check: https://eyouth-30904140202445-shop-sphere.vercel.app/api/health
* Database:     PostgreSQL on Supabase (production, no local/dev DB in use)
* Monitoring:   UptimeRobot, registered on the health-check endpoint above

Local (Docker, for development only):
* Frontend:     http://localhost:5173
* Backend:      http://localhost:5000
* Health Check: http://localhost:5000/api/health

3. HOW TO RUN LOCALLY (Docker)
---------------------------------
   docker compose up --build

   This automatically applies Prisma migrations and seeds demo data,
   then starts the backend and frontend. See section 2 for local URLs.

4. SEEDED TEST ACCOUNTS
--------------------------
* Shopper: shopper@nimbus.shop / shopper123
* Manager (admin dashboard access): manager@nimbus.shop / manager123

(These accounts exist in both the local seed data and the production
Supabase database, seeded via the same prisma/seed.js script.)

5. PRODUCTION SECURITY
--------------------------
* All secrets (database URLs, JWT secret, Supabase keys) are stored as
  environment variables on Vercel - none appear in the repository.
* The deployed backend is served over HTTPS by default (Vercel).
* Helmet, CORS, and rate limiting (300 requests / 15 min per IP on all
  /api/* routes) are active on the deployed backend - verified via
  response headers on the live health-check endpoint.

6. KEY ASSUMPTIONS
--------------------
* Product images are uploaded to Supabase Storage (not local disk),
  since Vercel's serverless filesystem is read-only/ephemeral.
* MongoDB is used for ratings/activity logs, with an automatic
  PostgreSQL fallback if MongoDB is ever unreachable.
* The health-check endpoint is monitored by UptimeRobot at 5-minute
  intervals; its dashboard reports the live status of the service.