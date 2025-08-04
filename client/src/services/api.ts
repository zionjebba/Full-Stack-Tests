import axios from "axios";
import type {
  ApiResponse,
  Product,
  Inquiry,
  InquiryWithProduct,
  InquiryForm,
  LoginForm,
  RegisterForm,
  AuthResponse,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  getProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get("/api/products");
    return response.data;
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },
};

export const inquiryService = {
  createInquiry: async (
    productId: string,
    inquiryData: InquiryForm
  ): Promise<ApiResponse<Inquiry>> => {
    const response = await api.post("/api/inquiries", {
      product: productId,
      ...inquiryData,
    });
    return response.data;
  },

  getInquiriesForProduct: async (
    productId: string
  ): Promise<ApiResponse<Inquiry[]>> => {
    const response = await api.get(`/api/inquiries/${productId}`);
    return response.data;
  },
};

export const authService = {
  login: async (credentials: LoginForm): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/api/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  register: async (
    userData: RegisterForm
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/api/auth/register", {
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  },
};

export const farmerService = {
  createProduct: async (productData: {
    title: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    imageUrl?: string;
  }): Promise<ApiResponse<Product>> => {
    const response = await api.post("/api/products", productData);
    return response.data;
  },

  getMyProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get("/api/products/my-products");
    return response.data;
  },

  getInquiriesForProduct: async (
    productId: string
  ): Promise<ApiResponse<Inquiry[]>> => {
    const response = await api.get(`/api/inquiries/${productId}`);
    return response.data;
  },

  getAllMyInquiries: async (): Promise<ApiResponse<InquiryWithProduct[]>> => {
    const response = await api.get("/api/inquiries/my-inquiries");
    return response.data;
  },
};

export default api;
