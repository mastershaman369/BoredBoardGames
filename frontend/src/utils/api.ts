import axios, { AxiosRequestConfig } from "axios";

export const API_BASE = typeof window === "undefined"
  ? process.env.NEXT_PUBLIC_API_BASE || "http://backend:8000/api"
  : process.env.NEXT_PUBLIC_API_BASE || "/api";

export const getProducts = async (categoryId?: string) => {
  const url = categoryId ? `${API_BASE}/products?category_id=${categoryId}` : `${API_BASE}/products`;
  const res = await axios.get(url);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${API_BASE}/categories`);
  return res.data;
};

export const createLayawayOrder = async (order: any) => {
  const res = await axios.post(`${API_BASE}/orders`, order);
  return res.data;
};

export const createStripeCheckoutSession = async (line_items: any[]) => {
  const res = await axios.post(`${API_BASE}/stripe/create-checkout-session`, { line_items });
  return res.data;
};

export const getLayawayEnabled = async () => {
  const res = await axios.get(`${API_BASE}/settings`);
  return res.data.layaway_enabled;
};

export const setLayawayEnabled = async (enabled: boolean) => {
  const res = await axios.put(`${API_BASE}/settings`, { layaway_enabled: enabled });
  return res.data;
};

// Fetch single product by slug
export const getProduct = async (slug: string) => {
  const res = await axios.get(`${API_BASE}/products/${slug}`);
  return res.data;
};

// Fetch user profile
export const getProfile = async () => {
  const res = await axios.get(`${API_BASE}/profiles/me`);
  return res.data;
};

// Fetch user orders
export const getOrders = async () => {
  const res = await axios.get(`${API_BASE}/orders`);
  return res.data;
};
