import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header/Header';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import CategoryList from '../../components/createBooking/CategoryList/CategoryList';
import ItemList from '../../components/createBooking/ItemList/ItemList';
import styles from './CreateBooking.module.scss';
import styles from './CreateBooking.module.scss';

export default function CreateBooking({ setUser }) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch items when category changes
  // Fetch items when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchItemsByCategory(selectedCategory._id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      const res = await fetch('/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data.categories || []);
      if (data.categories?.length > 0) {
      if (data.categories?.length > 0) {
        setSelectedCategory(data.categories[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/items/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      const res = await fetch(`/api/items/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((ci) => ci._id === item._id);
      return found
        ? prev.map((ci) =>
            ci._id === item._id ? { ...ci, quantity: ci.quantity + 1 } : ci
          )
        : [...prev, { ...item, quantity: 1 }];
    setCart((prev) => {
      const found = prev.find((ci) => ci._id === item._id);
      return found
        ? prev.map((ci) =>
            ci._id === item._id ? { ...ci, quantity: ci.quantity + 1 } : ci
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const getCartItemCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);
  const getCartItemCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  if (loading && categories.length === 0) {
    return <div className={styles.loading}>Loading categories...</div>;
    return <div className={styles.loading}>Loading categories...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      {/* Common Layout */}
      <Header />
      <Navbar setUser={setUser} />

      {/* Page Content */}
      <main className={styles.CreateBooking}>
        {/* Page Title */}
        <div className={styles.sectionHeading}>
          <span>CREATE BOOKING</span>
          <span>Cart ({getCartItemCount()} items)</span>
        </div>

        <div className={styles.content}>
          {/* Sidebar Categories */}
          <div className={styles.sidebar}>
            <h2>Categories</h2>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Main Items List */}
          <div className={`${styles.itemsContainer} flex-col scroll-y`}>
            <h2>
              {selectedCategory
                ? `${selectedCategory.name} Items`
                : 'Select a Category'}
            </h2>

            {loading ? (
              <div className={styles.loading}>Loading items...</div>
            ) : (
              <ItemList items={items} onAddToCart={addToCart} cart={cart} />
            )}
          </div>
        </div>

        {/* Cart Summary */}
        <section className={styles.total}>
          {cart.length ? (
            <>
              <button
                className="btn-sm"
                onClick={() => (window.location.href = '/checkout')}
              >
                CHECKOUT
              </button>
              <span>{getCartItemCount()} items</span>
            </>
          ) : (
            <div className={styles.empty}>Cart is empty</div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
