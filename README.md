# Books Website - MERN Stack

A free books library website built with MongoDB, Express, React, and Node.js.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### MongoDB Setup
Make sure MongoDB is running on `mongodb://localhost:27017`

Or use MongoDB Atlas (free cloud database):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

## Features
- Add books (title, author, description, year, genre)
- View all books
- Edit books
- Delete books
- Responsive design

## API Endpoints
- GET `/api/books` - Get all books
- POST `/api/books` - Add new book
- PUT `/api/books/:id` - Update book
- DELETE `/api/books/:id` - Delete book
