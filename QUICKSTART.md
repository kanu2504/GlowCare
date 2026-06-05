# 🚀 GlowCare Wellness - Quick Start Guide

## ⚡ Getting Started in 5 Steps

### Step 1: Start MongoDB
Ensure MongoDB is running locally or update the connection string in `backend/.env` for MongoDB Atlas.

```bash
# If using local MongoDB
mongod
```

### Step 2: Install & Run Backend
```bash
cd backend
npm install
npm run seed          # Seed sample products (optional)
npm run dev           # Starts on http://localhost:5000
```

### Step 3: Install & Run Frontend
```bash
cd frontend
npm install
npm run dev           # Starts on http://localhost:3000
```

### Step 4: Open Application
Visit `http://localhost:3000` in your browser

### Step 5: Test the Application
- Browse products on the Home page
- Click on Products to view all items
- Submit an enquiry through the Enquiry form
- View submitted enquiries in the Admin page
- Try dark mode toggle in the navbar

---

## 📦 Project Checklist

### Backend Completed ✅
- [x] Express server setup
- [x] MongoDB connection
- [x] Product model & routes
- [x] Enquiry model & routes
- [x] Controllers with validation
- [x] CORS enabled
- [x] Sample data seeding
- [x] Environment configuration

### Frontend Completed ✅
- [x] Vite + React setup
- [x] React Router navigation
- [x] 5 main pages (Home, Products, ProductDetails, Enquiry, Admin)
- [x] 6 reusable components
- [x] Complete CSS styling (no Tailwind)
- [x] Dark mode functionality
- [x] Responsive design
- [x] Form validation
- [x] API integration

### Styling Completed ✅
- [x] Global CSS with CSS variables
- [x] Luxury beauty theme design
- [x] Responsive grid layouts
- [x] Component-specific styling
- [x] Dark mode color scheme
- [x] Smooth animations & transitions

---

## 🎯 Key Features

### Pages
1. **Home** - Hero, featured products, categories, benefits, testimonials
2. **Products** - Product grid with category filtering
3. **Product Details** - Full product information and enquiry CTA
4. **Enquiry** - Form with validation and success feedback
5. **Admin** - Enquiry management with search and status updates

### Components
- **Navbar** - Navigation with dark mode toggle & mobile menu
- **Footer** - Links and branding
- **Hero** - Landing section with animations
- **ProductCard** - Reusable product display
- **Categories** - Category showcase
- **Testimonials** - Customer reviews

---

## 🔌 API Testing

### Test Products API
```bash
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products/[product-id]
```

### Test Enquiry API
```bash
# Create enquiry
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "phone":"9876543210",
    "email":"john@example.com",
    "product":"Luxe Hydrating Face Serum",
    "message":"I am interested in this product"
  }'

# Get all enquiries
curl http://localhost:5000/api/enquiries

# Update status
curl -X PATCH http://localhost:5000/api/enquiries/[enquiry-id]/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Contacted"}'
```

---

## 🎨 Customization

### Change Colors
Edit CSS variables in `frontend/src/styles/index.css`:
```css
:root {
  --primary-color: #f8d7da;
  --secondary-color: #f3c5d1;
  --accent-gold: #d4af37;
  /* ... update others as needed */
}
```

### Add More Products
1. Add products to `backend/seed/productSeed.js`
2. Run `npm run seed` in backend
3. Products will appear immediately on frontend

### Modify Product Categories
Edit the enum in `backend/models/Product.js` and update dropdown in `frontend/src/pages/Enquiry.jsx`

---

## 📁 Important Files

**Backend:**
- `backend/server.js` - Main server entry point
- `backend/.env` - Configuration variables
- `backend/config/db.js` - Database connection
- `backend/seed/productSeed.js` - Sample data
- `backend/routes/` - API endpoints

**Frontend:**
- `frontend/src/App.jsx` - Main app component with routing
- `frontend/src/pages/` - Page components
- `frontend/src/components/` - Reusable components
- `frontend/src/services/api.js` - Axios API calls
- `frontend/src/styles/` - All styling files

---

## ⚙️ Configuration

### MongoDB Connection
Update in `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/glowcare
```

Or use MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glowcare
```

### API Base URL
Frontend automatically proxies to backend via Vite config.
To change API: Update `frontend/vite.config.js` proxy settings

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB is accessible

### API Not Responding
- Check if backend is running on port 5000
- Verify CORS is enabled in backend
- Check network tab in browser dev tools

### Styles Not Loading
- Clear browser cache
- Run `npm run dev` again
- Check CSS file imports

---

## 📊 Sample Data

6 products are seeded with the following categories:
- **Skincare** (3 products): Hydrating Serum, Day Cream, Facial Oil
- **Wellness** (1 product): Detox Tea
- **Beauty** (1 product): Body Oil
- **Haircare** (1 product): Hair Mask

---

## 🚀 Deployment

### Deploy Backend (Heroku/Railway)
1. Create account on Heroku/Railway
2. Set environment variables
3. Deploy using platform CLI or GitHub integration

### Deploy Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect to Vercel/Netlify
3. Update API base URL for production
4. Automatic deployment on push

---

## 📝 Development Tips

- Use `console.log()` for debugging (removed in production)
- Check browser console for errors
- Use Network tab to verify API calls
- Test responsive design using browser DevTools
- Use dark mode to test theme switching

---

## ✨ Next Steps

1. Start both servers
2. Test all pages and features
3. Submit test enquiries
4. Update enquiry statuses in admin
5. Customize colors and content
6. Add more products as needed
7. Deploy when ready

---

**Happy Coding! 🎉**
