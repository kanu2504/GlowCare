# GlowCare Wellness Project - Copilot Instructions

## Project Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for a wellness and beauty e-commerce enquiry management system.

## Technology Stack

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- REST API with CORS support
- Environment configuration with dotenv

### Frontend
- React 18 with Vite
- React Router DOM v6
- Axios for API calls
- CSS3 (no Tailwind)
- Responsive design

## Project Structure

```
GlowCare/
├── backend/          # Express API server
├── frontend/         # React Vite application
├── README.md         # Project documentation
└── .gitignore
```

## Running the Project

### Start Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on: http://localhost:5000

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Application runs on: http://localhost:3000

## Database

MongoDB connection configured in `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/glowcare
```

To seed sample products:
```bash
cd backend
npm run seed
```

## Key Features

- **Product Management**: 6 sample products with full details
- **Enquiry Form**: Customer enquiry submission with validation
- **Admin Dashboard**: Manage and track customer enquiries
- **Dark Mode**: Toggle with localStorage persistence
- **Responsive Design**: Mobile-friendly layout
- **Search Functionality**: Search enquiries by name, phone, or product
- **Status Tracking**: Update enquiry status (New, Contacted, Closed)

## API Endpoints

**Products**
- GET /api/products
- GET /api/products/:id

**Enquiries**
- POST /api/enquiries
- GET /api/enquiries
- PATCH /api/enquiries/:id/status

## Main Pages

1. Home - Hero section, featured products, categories, testimonials
2. Products - Product grid with category filtering
3. Product Details - Full product information
4. Enquiry - Customer enquiry form with validation
5. Admin - Enquiry management dashboard

## Development Notes

- All components are functional with React Hooks
- Clean, beginner-friendly code with comments
- Form validation on both frontend and backend
- Error handling and user feedback
- Smooth animations and transitions
- Professional luxury design theme

## Environment Setup

Frontend API calls automatically proxy to backend (configured in vite.config.js)
