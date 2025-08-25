import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header"
import SearchBar from "../components/common/Searchbar";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
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
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Fetch random items (with pagination)
  useEffect(() => {
    async function fetchItems() {
      setLoadingItems(true);
      try {
        const response = await fetch(`/api/items/random?page=${page}&limit=5`);
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingItems(false);
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
    <Header/>
      <Navbar />
      <SearchBar/>
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
