"use client";

import { useEffect, useState } from "react";
import { getLayawayEnabled } from "../../utils/api";
import axios from "axios";

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [layawayEnabled, setLayawayEnabled] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchLayaway();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("/api/orders");
    setOrders(res.data);
  };
  const fetchLayaway = async () => {
    setLayawayEnabled(await getLayawayEnabled());
  };

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: 32 }}>
        <h2>Layaway Status: {layawayEnabled ? "Enabled" : "Disabled"}</h2>
        <p>(Toggle coming soon via admin UI. Currently set in backend .env)</p>
      </div>
      <div>
        <h2>Orders</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Order ID</th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>User Email</th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Status</th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_email}</td>
                <td>{order.status}</td>
                <td>
                  <ul>
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx}>{item.name} (${item.price})</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
