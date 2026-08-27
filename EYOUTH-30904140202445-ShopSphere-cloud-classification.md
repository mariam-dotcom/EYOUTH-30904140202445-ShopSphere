# ShopSphere - Cloud Service Classification
**Student ID:** EYOUTH-30904140202445
**Project:** ShopSphere Enterprise Production and Cloud Modernization - Task 2.2

This document classifies the three cloud services used in the Task 1 production deployment, by service model (IaaS / PaaS / SaaS), with a one-line reason for each.

---

## 1. Frontend Hosting - Vercel

**Classification: PaaS (Platform as a Service)**

**Reason:** Vercel builds and runs the React application from source code without requiring any server, OS, or infrastructure management on our part - we only provide the code and Vercel handles the build, hosting, CDN, and HTTPS layer.

---

## 2. Backend Hosting - Vercel (Serverless Functions)

**Classification: PaaS (Platform as a Service)**

**Reason:** The Express backend runs as a Vercel serverless function - we deploy application code only, while Vercel provisions the compute, scaling, and routing automatically with no server management required from us.

---

## 3. Database - Supabase (PostgreSQL)

**Classification: PaaS (Platform as a Service)**

**Reason:** Supabase provisions and fully manages the underlying PostgreSQL database (patching, backups, connection pooling, scaling) - we interact with it purely through a connection string and the Prisma ORM, never managing the database server itself.

---

## Summary Table

| Service | Provider | Service Model | One-Line Reason |
|---|---|---|---|
| Frontend Hosting | Vercel | PaaS | Deploys from source; no server/infrastructure managed by us. |
| Backend Hosting | Vercel (Serverless Functions) | PaaS | Runs our code as managed functions; compute and scaling handled by the platform. |
| Database | Supabase (PostgreSQL) | PaaS | Fully managed Postgres instance; we only manage schema and data, not the server. |
