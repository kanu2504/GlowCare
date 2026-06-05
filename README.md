# GlowCare Wellness - Full-Stack MERN Application

A premium wellness and beauty e-commerce enquiry management application built with the MERN stack.

## 🌟 Project Overview

GlowCare Wellness is a luxury beauty and wellness e-commerce platform that allows customers to browse premium products, submit enquiries about products of interest, and enables admins to manage these enquiries efficiently.

### Key Features

✨ **Product Catalog**
- Browse 6 curated wellness and beauty products
- Detailed product information with images
- Product categorization (Skincare, Wellness, Beauty, Haircare)
- Responsive product grid layout

🛍️ **Shopping Experience**
- Hero banner with call-to-action
- Featured products showcase
- Product category filtering
- Product detail pages
- Premium luxury design theme

📝 **Enquiry Management**
- Customer enquiry form with validation
- Form field validation (Name, Phone, Email, Product, Message)
- Success confirmation alerts
- Database storage of all enquiries

👨‍💼 **Admin Dashboard**
- View all customer enquiries
- Search by Name, Phone, or Product
- Update enquiry status (New, Contacted, Closed)
- Real-time status updates without page refresh
- Professional admin interface

🌓 **User Experience**
- Dark mode toggle with localStorage persistence
- Responsive design (Desktop, Tablet, Mobile)
- Smooth animations and transitions
- Sticky navigation bar
- Mobile hamburger menu
- Professional footer with links

## 💻 Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool
- **React Router DOM v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling (No Tailwind)
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 🎨 Design System

### Color Palette
- **Primary**: #F8D7DA (Soft Pink)
- **Secondary**: #F3C5D1 (Light Pink)
- **Background**: #FFF8F9 (Off-white)
- **Accent Gold**: #D4AF37 (Luxury Gold)
- **Text**: #333333 (Dark Gray)

### Typography
- Elegant and professional headings
- Clean modern body text
- Soft shadows and rounded corners
- Professional spacing

## 📁 Project Structure

```
GlowCare/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   └── Enquiry.js            # Enquiry schema
│   ├── controllers/
│   │   ├── productController.js
│   │   └── enquiryController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── enquiryRoutes.js
│   ├── seed/
│   │   └── productSeed.js        # Sample product data
│   ├── server.js                 # Main server file
│   ├── .env                      # Environment variables
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Enquiry.jsx
│   │   │   └── AdminEnquiries.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Categories.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios API calls
│   │   ├── styles/
│   │   │   ├── index.css         # Global styles
│   │   │   ├── navbar.css
│   │   │   ├── footer.css
│   │   │   ├── productCard.css
│   │   │   ├── hero.css
│   │   │   ├── testimonials.css
│   │   │   ├── categories.css
│   │   │   └── pages.css
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── .gitignore
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/glowcare
PORT=5000
```

5. Seed sample products (optional):
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔌 API Routes

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID

### Enquiries
- **POST** `/api/enquiries` - Create new enquiry
- **GET** `/api/enquiries` - Get all enquiries
- **PATCH** `/api/enquiries/:id/status` - Update enquiry status

## 📊 Database Schemas

### Product Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  image: String (required),
  price: Number (required),
  category: String (enum: ['Skincare', 'Wellness', 'Beauty', 'Haircare']),
  shortDescription: String (required),
  fullDescription: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Enquiry Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  phone: String (required, 10 digits),
  email: String (required, valid email),
  product: String (required),
  message: String (required),
  status: String (enum: ['New', 'Contacted', 'Closed'], default: 'New'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Pages & Features

### 1. **Home Page**
- Hero banner with "Glow Like Never Before" heading
- Featured products grid
- Categories showcase
- Why Choose GlowCare section
- Customer testimonials
- Professional footer

### 2. **Products Page**
- All products grid
- Category filter buttons
- Product cards with images and prices
- Responsive layout (4 columns desktop, 2 tablet, 1 mobile)

### 3. **Product Details Page**
- Large product image
- Product name, price, and category
- Full product description
- Benefits list
- Enquire Now button
- Back to products link

### 4. **Enquiry Page**
- Form with validation
- Fields: Name, Phone, Email, Product dropdown, Message
- Real-time validation feedback
- Success alert on submission
- Error messages for invalid inputs

### 5. **Admin Enquiries Page**
- Table of all enquiries
- Search functionality (Name, Phone, Product)
- Status dropdown (New, Contacted, Closed)
- Real-time status updates
- Responsive table design

### 6. **Navbar**
- Logo and branding
- Navigation links (Home, Products, Enquiry, Admin)
- Dark mode toggle
- Mobile hamburger menu
- Sticky positioning

## 🌓 Dark Mode

- Toggle button in navbar
- Preference saved to localStorage
- Automatic application to entire site
- Includes dark theme for all colors

## 📱 Responsive Design

- **Desktop**: 4 product cards per row
- **Tablet**: 2 product cards per row
- **Mobile**: 1 product card per row
- Mobile hamburger menu navigation
- Optimized touch targets and spacing

## 🔍 Form Validation

### Enquiry Form
- ✅ Name required and non-empty
- ✅ Phone required and 10 digits
- ✅ Email required and valid format
- ✅ Product required
- ✅ Message required
- ✅ Real-time error feedback

## 🎮 Usage Guide

### For Customers
1. Browse products on home or products page
2. Click on any product to view full details
3. Click "Enquire Now" to submit an enquiry
4. Fill in the form with required information
5. Submit and receive confirmation

### For Admins
1. Navigate to Admin page
2. View all customer enquiries
3. Search by Name, Phone, or Product
4. Update enquiry status as needed
5. Track customer interactions

## 🚀 Deployment

### Backend (Node.js)
- Deploy to Heroku, Railway, or similar platform
- Set environment variables on deployment platform
- MongoDB Atlas for cloud database

### Frontend (React)
- Build: `npm run build`
- Deploy to Vercel, Netlify, or GitHub Pages
- Update API base URL for production

## 📚 Sample Products

1. **Luxe Hydrating Face Serum** - ₹2,499 (Skincare)
2. **Radiance Boosting Day Cream** - ₹3,299 (Skincare)
3. **Golden Glow Body Oil** - ₹1,899 (Beauty)
4. **Wellness Detox Tea Blend** - ₹899 (Wellness)
5. **Silky Hair Restoration Mask** - ₹2,099 (Haircare)
6. **Night Recovery Facial Oil** - ₹2,799 (Skincare)

## 🔮 Future Enhancements

- User authentication and accounts
- Shopping cart and checkout
- Payment gateway integration
- Product reviews and ratings
- Email notifications
- Advanced admin analytics
- Wishlist functionality
- Product image gallery
- Customer accounts and order history
- Email confirmations for enquiries
- SMS notifications
- Multi-language support
- Live chat support

## 📝 Code Style

- Clean, readable, and beginner-friendly code
- Functional React components
- React Hooks (useState, useEffect)
- Clear comments and documentation
- Modular component structure
- Consistent naming conventions

## 🤝 Contributing

This is an internship project. For improvements and suggestions, please create an issue or pull request.

## 📄 License

MIT License - Feel free to use this project for your portfolio.

## 👨‍💻 Author

Created as a Full-Stack MERN Internship Project

## ✨ Acknowledgments

- Built with React, Node.js, Express, and MongoDB
- Designed with luxury and beauty industry standards
- Optimized for performance and responsiveness
- Beginner-friendly implementation

## 📞 Support

For issues or questions, please refer to the API documentation and code comments.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Ready for Internship Review
