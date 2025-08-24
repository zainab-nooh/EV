import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`); 
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <main className={styles.mainContent}>
        <h1>Available Categories</h1>
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
      </main>
      <Footer />
    </>
  );
}
