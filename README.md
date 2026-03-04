# CraftLens AI — Setup & Credentials

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running locally on `mongodb://localhost:27017`.

### 3. Seed the Dummy User

```bash
cd backend
npm run seed
```

### 4. Run the App

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend
npm run dev
```

### 5. Login

Open `http://localhost:3000/login` and use the dummy credentials below.

---

## Dummy User Credentials

| Field             | Value                    |
|-------------------|--------------------------|
| **Name**          | Demo Seller              |
| **Email**         | `demo@craftlens.ai`      |
| **Password**      | `Demo@1234`              |
| **Business Name** | CraftLens Demo Shop      |
| **Category**      | Embroidery               |
| **Role**          | Seller                   |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Value                                         |
|----------------|-----------------------------------------------|
| `PORT`         | `5000`                                        |
| `MONGODB_URI`  | `mongodb://localhost:27017/craftlens-ai`       |
| `JWT_SECRET`   | `craftlens_dev_secret_key_2026`                |
| `NODE_ENV`     | `development`                                 |

### Frontend (`frontend/.env`)

| Variable       | Value                          |
|----------------|--------------------------------|
| `VITE_API_URL` | `http://localhost:5000/api`    |

---

## API Endpoints

| Method | Endpoint                        | Auth | Description               |
|--------|---------------------------------|------|---------------------------|
| POST   | `/api/auth/register`            | No   | Register new user         |
| POST   | `/api/auth/login`               | No   | Login, returns JWT token  |
| GET    | `/api/auth/profile`             | Yes  | Get logged-in user profile|
| PUT    | `/api/auth/profile`             | Yes  | Update profile            |
| POST   | `/api/products/upload`          | Yes  | Upload product + image    |
| GET    | `/api/products`                 | Yes  | Get user's products       |
| GET    | `/api/products/:id`             | Yes  | Get product by ID         |
| PUT    | `/api/products/:id/price`       | Yes  | Update product price      |
| DELETE | `/api/products/:id`             | Yes  | Delete product            |
| GET    | `/api/pricing/profit/:productId`| Yes  | Calculate profit margin   |
| GET    | `/api/pricing/fairness/:productId`| Yes| Price fairness check      |
| GET    | `/api/pricing/analytics`        | Yes  | Overall price analytics   |
| GET    | `/api/health`                   | No   | Health check              |
