import axios from "axios";

const API_BASE = typeof window === "undefined"
  ? process.env.NEXT_PUBLIC_API_BASE || "http://backend:8000/api"
  : process.env.NEXT_PUBLIC_API_BASE || "/api";

export const getProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
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
  const res = await axios.get(`${API_BASE}/settings/layaway`);
  return res.data.layaway_enabled;
};
