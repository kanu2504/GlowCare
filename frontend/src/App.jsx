import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';

// Public User Pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import Services from './pages/Services';
import Products from './pages/user/Products';
import ProductDetails from './pages/ProductDetails';
import Blog from './pages/Blog';
import Contact from './pages/user/Contact';
import Enquiry from './pages/user/Enquiry';
import Login from './pages/Login';
import Profile from './pages/user/Profile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminProducts from './pages/admin/AdminProducts';

// Helper component to conditionally render Footer
const ConditionalFooter = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  if (isAdminPath) return null;
  return <Footer />;
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('glowcare-theme') || 'light');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('glowcare-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="app">
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main className="main-content">
            <Routes>
              {/* Public/User Website Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/enquiry" 
                element={
                  <ProtectedRoute>
                    <Enquiry />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />

              {/* User Protected Routes */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Panel Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="enquiries" element={<AdminEnquiries />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <ConditionalFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
