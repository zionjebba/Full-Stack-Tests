export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, unknown>[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "buyer";
  createdAt: string;
}

export interface FarmerInfo {
  _id: string;
  name: string;
  email: string;
}

export interface Product {
  _id: string;
  farmer: FarmerInfo | string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  product: string;
  buyerEmail: string;
  message: string;
  createdAt: string;
}

export interface InquiryWithProduct {
  id: string;
  product: {
    _id: string;
    title: string;
    category: string;
  };
  buyerEmail: string;
  message: string;
  createdAt: string;
}

export interface InquiryForm {
  buyerEmail: string;
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "farmer" | "buyer";
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}
