import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const getProducts = async () => {
  const response = await api.get(`/products?t=${Date.now()}`);
  const data = response.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.products)) return data.products;
  if (Array.isArray(data.data)) return data.data;

  console.error("Invalid products response:", data);
  return [];
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}?t=${Date.now()}`);
  return response.data.product || response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, {
    ...productData,
    price: Number(productData.price),
    stock: Number(productData.stock),
    rating: Number(productData.rating)
  });
  return response.data.product || response.data;
};

// Other API calls kept for compatibility
export const getAdminProducts = async () => {
  const response = await api.get('/products/admin/all');
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const createEnquiry = async (enquiryData) => {
  const response = await api.post('/enquiries', enquiryData);
  return response.data;
};

export const getEnquiries = async () => {
  const response = await api.get('/enquiries');
  return response.data;
};

export const updateEnquiryStatus = async (id, status) => {
  const response = await api.patch(`/enquiries/${id}/status`, { status });
  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await api.delete(`/enquiries/${id}`);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};

export default api;
