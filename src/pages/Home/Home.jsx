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
    async function fetchCategories() {
      try {
        const cdata = await getAllCategories();
        setCategories(cdata)
      }
      catch (error) {
        setError(error.message)
      }
    }
    fetchCategories()
  }, []);

  // Fetch random items (with pagination)
  useEffect(() => {
    async function fetchItems() {
      setLoadingItems(true);
      try {
        const idata = await getAllItems()
        setItems(idata)
      }
      catch (error) {
        setError(error.message)
      }
    }
    fetchItems();
  }, [page]);

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
          <p>Loading categories...</p>
        ) : (
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
        )}

        {/* Random Items Section */}
        <h2>Random Items</h2>
        {loadingItems ? (
          <p>Loading items...</p>
        ) : (
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
