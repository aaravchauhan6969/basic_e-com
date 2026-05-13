# Basic E-Commerce Project 🛒

A basic full-stack e-commerce web application built using **Node.js, Express.js, MongoDB, and vanilla HTML/CSS/JavaScript**.

This project includes user authentication, product management, and frontend pages for a simple shopping experience.

---

## Features ✨

- User Registration & Login (JWT Authentication)
- Product Listing
- Shopping Cart UI
- Order Page
- Admin Panel
- MongoDB Database Integration
- REST API Backend
- Static Frontend served through Express

---

## Tech Stack 🛠️

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

### Frontend

- HTML
- CSS
- JavaScript

---

## Project Structure 📂

```text
basic-e-com/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── .env.example
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── cart.html
│   ├── orders.html
│   ├── admin.html
│
├── .gitignore
└── README.md
```

---

## Installation & Setup 🚀

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/basic-e-com.git
```

Move into project folder:

```bash
cd basic-e-com
```

---

### 2. Install Backend Dependencies

Go to backend folder:

```bash
cd backend
```

Install packages:

```bash
npm install
```

---

### 3. Create Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

---

### 4. Start the Server

```bash
node server.js
```

If everything works:

```bash
Server running on port 5000
MongoDB Connected
```

---

### 5. Open the Application

Visit:

```bash
http://localhost:5000
```

---

## API Routes 📡

### Product Routes

```bash
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### User Routes

```bash
POST /api/users/register
POST /api/users/login
GET /api/users/profile
```

---

## Environment Variables 🔐

Required variables:

```env
MONGO_URI=
JWT_SECRET=
PORT=
```

---

## Notes 📝

- Do NOT commit your `.env` file.
- `node_modules` should not be pushed to GitHub.
- Use `.env.example` as a reference for environment setup.

---

## Future Improvements 💡

- Payment Gateway Integration
- Product Search
- Wishlist
- Better Admin Dashboard
- Image Upload Support
- Product Categories
- Order Tracking
- Responsive UI Improvements