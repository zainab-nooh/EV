import { useState, useEffect } from "react";
import Header from '../../components/common/Header/Header'

import Footer from "../../components/common/Footer/Footer";
import Searchbar from "../../components/common/Searchbar/Searchbar"
import styles from "../../pages/Home/Home.module.scss";
import { getAll as getAllCategories  } from "../../utils/categories-api";
import { getAll as getAllItems } from "../../utils/items-api"
import { useNavigate } from "react-router-dom";

export default function Homepage({setUser}) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
      fetchCategories();
      fetchItems();
    }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch random items (with pagination)
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleNextItems = () => {
    setPage(prev => prev + 1);
  };

  if (error) return <p>Error: {error}</p>;
  return (
    <>
    <Header setUser={setUser} />
      <Searchbar />
      <main className={styles.mainContent}>
        {/* Categories Section */}
        <h1>Available Categories</h1>
        {loadingCategories ? (

          <div className={styles.categoriesGrid}>
            {categories.map(category => (
              <div
                key={category._id}
                className={styles.categoryCard}
                onClick={() => handleCategoryClick(category._id)}
              >
                <img
                  src={category.image || '/default-category.png'}
                  alt={category.name}
                  className={styles.categoryImage}
                />
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading categories...</p>
        )}

        {/* Random Items Section */}
        <h2>Random Items</h2>
        {loadingItems ? (
          <div className={styles.itemsGrid}>
            {items.map(item => (
              <div key={item._id} className={styles.itemCard}>
                <img
                  src={item.image || '/default-item.png'}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          // <p>Loading items...</p>
        ) : (
          // <div className={styles.itemsGrid}>
          //   {items.map(item => (
          //     <div key={item._id} className={styles.itemCard}>
          //       <img
          //         src={item.image || '/default-item.png'}
          //         alt={item.name}
          //         className={styles.itemImage}
          //       />
          //       <h4>{item.name}</h4>
          //       <p>{item.description}</p>
          //     </div>
          //   ))}
          // </div>
          <p>Loading items...</p>
        )}

        {/* Next Button */}
        <button
          className={styles.nextButton}
          onClick={handleNextItems}
          disabled={loadingItems}
        >
          Next
        </button>
      </main>
      <Footer />
    </>
  );
}
