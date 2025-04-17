"use client";

import { useEffect, useState } from "react";
import { getLayawayEnabled, setLayawayEnabled, getProducts, getCategories } from "../../utils/api";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const initialProduct = {
  name: "",
  description: "",
  price: "",
  sale_price: "",
  images: [""],
  tags: "",
  categories: "",
  sku: "",
  inventory: "",
  specs: "",
  slug: "",
  custom_url: "",
};
const initialCategory = {
  name: "",
  description: "",
  slug: "",
  image: "",
  tags: "",
  custom_url: "",
};

export default function Admin() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Always call hooks in the same order
  const [orders, setOrders] = useState<any[]>([]);
  const [layawayEnabled, setLayawayEnabledState] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<any>({ ...initialProduct });
  const [newCategory, setNewCategory] = useState<any>({ ...initialCategory });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [layawayLoading, setLayawayLoading] = useState(false);
  const { showToast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  // Fetch data after authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchLayaway();
      fetchProducts();
      fetchCategories();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <div>Redirecting to login...</div>;

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
      const prod = {
        ...newProduct,
        id,
        price: parseFloat(newProduct.price),
        sale_price: newProduct.sale_price ? parseFloat(newProduct.sale_price) : undefined,
        images: newProduct.images.filter((img: string) => img),
        tags: newProduct.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        categories: newProduct.categories.split(",").map((c: string) => c.trim()).filter(Boolean),
        inventory: newProduct.inventory ? parseInt(newProduct.inventory) : undefined,
        specs: newProduct.specs ? JSON.parse(newProduct.specs) : {},
      };
      await axios.post("/api/products", prod);
      setNewProduct({ ...initialProduct });
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
    setEditingProduct({
      ...product,
      tags: product.tags ? product.tags.join(", ") : "",
      categories: product.categories ? product.categories.join(", ") : "",
      images: product.images || [""]
    });
  };
  const handleCancelEditProduct = () => {
    setEditingProductId(null);
    setEditingProduct(null);
  };
  const handleSaveEditProduct = async () => {
    try {
      const prod = {
        ...editingProduct,
        price: parseFloat(editingProduct.price),
        sale_price: editingProduct.sale_price ? parseFloat(editingProduct.sale_price) : undefined,
        images: editingProduct.images.filter((img: string) => img),
        tags: editingProduct.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        categories: editingProduct.categories.split(",").map((c: string) => c.trim()).filter(Boolean),
        inventory: editingProduct.inventory ? parseInt(editingProduct.inventory) : undefined,
        specs: editingProduct.specs ? JSON.parse(editingProduct.specs) : {},
      };
      await axios.put(`/api/products/${editingProductId}`, prod);
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
      const cat = {
        ...newCategory,
        id,
        tags: newCategory.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      };
      await axios.post("/api/categories", cat);
      setNewCategory({ ...initialCategory });
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
    setEditingCategory({
      ...category,
      tags: category.tags ? category.tags.join(", ") : "",
    });
  };
  const handleCancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategory(null);
  };
  const handleSaveEditCategory = async () => {
    try {
      const cat = {
        ...editingCategory,
        tags: editingCategory.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      };
      await axios.put(`/api/categories/${editingCategoryId}`, cat);
      setEditingCategoryId(null);
      setEditingCategory(null);
      fetchCategories();
      showToast("Category updated!");
    } catch (err: any) {
      showToast(err.response?.data?.detail || "Failed to update category");
    }
  };

  // --- UI ---
  return (
    <main style={{ maxWidth: 1100, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: 32 }}>
        <h2>Layaway Status: {layawayEnabled ? "Enabled" : "Disabled"}</h2>
        <button onClick={handleLayawayToggle} disabled={layawayLoading} style={{ background: layawayEnabled ? '#16A085' : '#c0392b', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: layawayLoading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
          {layawayLoading ? 'Updating...' : layawayEnabled ? 'Disable Layaway' : 'Enable Layaway'}
        </button>
      </div>
      <section style={{ marginBottom: 40 }}>
        <h2>Products</h2>
        <form onSubmit={handleAddProduct} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <input required placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input required placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input required type="number" min="0" step="0.01" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input type="number" min="0" step="0.01" placeholder="Sale Price" value={newProduct.sale_price} onChange={e => setNewProduct({ ...newProduct, sale_price: e.target.value })} />
          <input placeholder="Images (comma separated URLs)" value={newProduct.images.join(", ")} onChange={e => setNewProduct({ ...newProduct, images: e.target.value.split(",").map((s: string) => s.trim()) })} />
          <input placeholder="Tags (comma separated)" value={newProduct.tags} onChange={e => setNewProduct({ ...newProduct, tags: e.target.value })} />
          <input placeholder="Categories (comma separated)" value={newProduct.categories} onChange={e => setNewProduct({ ...newProduct, categories: e.target.value })} />
          <input placeholder="SKU" value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} />
          <input type="number" min="0" placeholder="Inventory" value={newProduct.inventory} onChange={e => setNewProduct({ ...newProduct, inventory: e.target.value })} />
          <input placeholder="Specs (JSON)" value={newProduct.specs} onChange={e => setNewProduct({ ...newProduct, specs: e.target.value })} />
          <input placeholder="Slug" value={newProduct.slug} onChange={e => setNewProduct({ ...newProduct, slug: e.target.value })} />
          <input placeholder="Custom URL" value={newProduct.custom_url} onChange={e => setNewProduct({ ...newProduct, custom_url: e.target.value })} />
          <button type="submit">Add Product</button>
        </form>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th><th>Description</th><th>Price</th><th>Sale Price</th><th>Images</th><th>Tags</th><th>Categories</th><th>SKU</th><th>Inventory</th><th>Specs</th><th>Slug</th><th>Custom URL</th><th></th><th></th>
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
                    <td><input type="number" value={editingProduct.sale_price} onChange={e => setEditingProduct({ ...editingProduct, sale_price: e.target.value })} /></td>
                    <td><input value={editingProduct.images.join(", ")} onChange={e => setEditingProduct({ ...editingProduct, images: e.target.value.split(",").map((s: string) => s.trim()) })} /></td>
                    <td><input value={editingProduct.tags} onChange={e => setEditingProduct({ ...editingProduct, tags: e.target.value })} /></td>
                    <td><input value={editingProduct.categories} onChange={e => setEditingProduct({ ...editingProduct, categories: e.target.value })} /></td>
                    <td><input value={editingProduct.sku} onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })} /></td>
                    <td><input type="number" value={editingProduct.inventory} onChange={e => setEditingProduct({ ...editingProduct, inventory: e.target.value })} /></td>
                    <td><input value={editingProduct.specs} onChange={e => setEditingProduct({ ...editingProduct, specs: e.target.value })} /></td>
                    <td><input value={editingProduct.slug} onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })} /></td>
                    <td><input value={editingProduct.custom_url} onChange={e => setEditingProduct({ ...editingProduct, custom_url: e.target.value })} /></td>
                    <td><button onClick={handleSaveEditProduct}>Save</button></td>
                    <td><button onClick={handleCancelEditProduct}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>{p.price}</td>
                    <td>{p.sale_price}</td>
                    <td>{p.images && p.images.join(", ")}</td>
                    <td>{p.tags && p.tags.join(", ")}</td>
                    <td>{p.categories && p.categories.join(", ")}</td>
                    <td>{p.sku}</td>
                    <td>{p.inventory}</td>
                    <td>{p.specs && JSON.stringify(p.specs)}</td>
                    <td>{p.slug}</td>
                    <td>{p.custom_url}</td>
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
        <form onSubmit={handleAddCategory} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <input required placeholder="Name" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
          <input placeholder="Description" value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />
          <input required placeholder="Slug" value={newCategory.slug} onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })} />
          <input placeholder="Image URL" value={newCategory.image} onChange={e => setNewCategory({ ...newCategory, image: e.target.value })} />
          <input placeholder="Tags (comma separated)" value={newCategory.tags} onChange={e => setNewCategory({ ...newCategory, tags: e.target.value })} />
          <input placeholder="Custom URL" value={newCategory.custom_url} onChange={e => setNewCategory({ ...newCategory, custom_url: e.target.value })} />
          <button type="submit">Add Category</button>
        </form>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th><th>Description</th><th>Slug</th><th>Image</th><th>Tags</th><th>Custom URL</th><th></th><th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c: any) => (
              <tr key={c.id}>
                {editingCategoryId === c.id ? (
                  <>
                    <td><input value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} /></td>
                    <td><input value={editingCategory.description} onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })} /></td>
                    <td><input value={editingCategory.slug} onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value })} /></td>
                    <td><input value={editingCategory.image} onChange={e => setEditingCategory({ ...editingCategory, image: e.target.value })} /></td>
                    <td><input value={editingCategory.tags} onChange={e => setEditingCategory({ ...editingCategory, tags: e.target.value })} /></td>
                    <td><input value={editingCategory.custom_url} onChange={e => setEditingCategory({ ...editingCategory, custom_url: e.target.value })} /></td>
                    <td><button onClick={handleSaveEditCategory}>Save</button></td>
                    <td><button onClick={handleCancelEditCategory}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{c.name}</td>
                    <td>{c.description}</td>
                    <td>{c.slug}</td>
                    <td>{c.image}</td>
                    <td>{c.tags && c.tags.join(", ")}</td>
                    <td>{c.custom_url}</td>
                    <td><button onClick={() => handleEditCategory(c)}>Edit</button></td>
                    <td><button onClick={() => handleDeleteCategory(c.id)}>Delete</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
