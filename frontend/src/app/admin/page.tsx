"use client";

import { useEffect, useState } from "react";
import { getLayawayEnabled, setLayawayEnabled, getProducts, getCategories } from "../../utils/api";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [layawayEnabled, setLayawayEnabledState] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<any>({ name: "", description: "", price: "", image_url: "", category_id: "" });
  const [newCategory, setNewCategory] = useState<any>({ name: "" });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [layawayLoading, setLayawayLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchOrders();
    fetchLayaway();
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("/api/orders");
    setOrders(res.data);
  };
  const fetchLayaway = async () => {
    setLayawayEnabledState(await getLayawayEnabled());
  };
  const handleLayawayToggle = async () => {
    setLayawayLoading(true);
    try {
      const updated = await setLayawayEnabled(!layawayEnabled);
      setLayawayEnabledState(updated.layaway_enabled);
      showToast(`Layaway ${updated.layaway_enabled ? "enabled" : "disabled"}`);
    } catch (err: any) {
      showToast("Failed to update layaway setting");
    }
    setLayawayLoading(false);
  };
  const fetchProducts = async () => {
    setProducts(await getProducts());
  };
  const fetchCategories = async () => {
    setCategories(await getCategories());
  };

  // --- Product CRUD ---
  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    try {
      const id = Date.now().toString();
      await axios.post("/api/products", { ...newProduct, id, price: parseFloat(newProduct.price) });
      setNewProduct({ name: "", description: "", price: "", image_url: "", category_id: "" });
      fetchProducts();
      showToast("Product added!");
    } catch (err: any) {
      showToast(err.response?.data?.detail || "Failed to add product");
    }
  };
  const handleDeleteProduct = async (id: string) => {
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
    showToast("Product deleted.");
  };
  const handleEditProduct = (product: any) => {
    setEditingProductId(product.id);
    setEditingProduct({ ...product });
  };
  const handleCancelEditProduct = () => {
    setEditingProductId(null);
    setEditingProduct(null);
  };
  const handleSaveEditProduct = async () => {
    try {
      await axios.put(`/api/products/${editingProductId}`, { ...editingProduct, price: parseFloat(editingProduct.price) });
      setEditingProductId(null);
      setEditingProduct(null);
      fetchProducts();
      showToast("Product updated!");
    } catch (err: any) {
      showToast(err.response?.data?.detail || "Failed to update product");
    }
  };

  // --- Category CRUD ---
  const handleAddCategory = async (e: any) => {
    e.preventDefault();
    try {
      const id = Date.now().toString();
      await axios.post("/api/categories", { ...newCategory, id });
      setNewCategory({ name: "" });
      fetchCategories();
      showToast("Category added!");
    } catch (err: any) {
      showToast(err.response?.data?.detail || "Failed to add category");
    }
  };
  const handleDeleteCategory = async (id: string) => {
    await axios.delete(`/api/categories/${id}`);
    fetchCategories();
    showToast("Category deleted.");
  };
  const handleEditCategory = (category: any) => {
    setEditingCategoryId(category.id);
    setEditingCategory({ ...category });
  };
  const handleCancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategory(null);
  };
  const handleSaveEditCategory = async () => {
    try {
      await axios.put(`/api/categories/${editingCategoryId}`, editingCategory);
      setEditingCategoryId(null);
      setEditingCategory(null);
      fetchCategories();
      showToast("Category updated!");
    } catch (err: any) {
      showToast(err.response?.data?.detail || "Failed to update category");
    }
  };

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: 32 }}>
        <h2>Layaway Status: {layawayEnabled ? "Enabled" : "Disabled"}</h2>
        <button onClick={handleLayawayToggle} disabled={layawayLoading} style={{ background: layawayEnabled ? '#16A085' : '#c0392b', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: layawayLoading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
          {layawayLoading ? 'Updating...' : layawayEnabled ? 'Disable Layaway' : 'Enable Layaway'}
        </button>
      </div>
      <section style={{ marginBottom: 40 }}>
        <h2>Products</h2>
        <form onSubmit={handleAddProduct} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <input required placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input required placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input required type="number" min="0" step="0.01" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input required placeholder="Image URL" value={newProduct.image_url} onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })} />
          <select required value={newProduct.category_id} onChange={e => setNewProduct({ ...newProduct, category_id: e.target.value })}>
            <option value="">Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button type="submit">Add Product</button>
        </form>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th><th>Description</th><th>Price</th><th>Category</th><th>Image</th><th></th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id}>
                {editingProductId === p.id ? (
                  <>
                    <td><input value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} /></td>
                    <td><input value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} /></td>
                    <td><input type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} /></td>
                    <td>
                      <select value={editingProduct.category_id} onChange={e => setEditingProduct({ ...editingProduct, category_id: e.target.value })}>
                        <option value="">Category</option>
                        {categories.map((cat: any) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </td>
                    <td><input value={editingProduct.image_url} onChange={e => setEditingProduct({ ...editingProduct, image_url: e.target.value })} /></td>
                    <td><button onClick={handleSaveEditProduct}>Save</button></td>
                    <td><button onClick={handleCancelEditProduct}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>{categories.find((c: any) => c.id === p.category_id)?.name}</td>
                    <td><img src={p.image_url} alt={p.name} style={{ width: 50, height: 40, objectFit: "cover" }} /></td>
                    <td><button onClick={() => handleEditProduct(p)}>Edit</button></td>
                    <td><button onClick={() => handleDeleteProduct(p.id)}>Delete</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section style={{ marginBottom: 40 }}>
        <h2>Categories</h2>
        <form onSubmit={handleAddCategory} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <input required placeholder="Category Name" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
          <button type="submit">Add Category</button>
        </form>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th><th></th><th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c: any) => (
              <tr key={c.id}>
                {editingCategoryId === c.id ? (
                  <>
                    <td><input value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} /></td>
                    <td><button onClick={handleSaveEditCategory}>Save</button></td>
                    <td><button onClick={handleCancelEditCategory}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{c.name}</td>
                    <td><button onClick={() => handleEditCategory(c)}>Edit</button></td>
                    <td><button onClick={() => handleDeleteCategory(c.id)}>Delete</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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
