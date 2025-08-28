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
    }
  };
  const handleCategoryClick = (categoryId) => {
    navigate(`/bookings/new?category=${categoryId}`);
  };
  const handleNextItems = () => {
    setPage(prev => prev + 1);
  };
  if (error) return <p>Error: {error}</p>;
  return (
    <>
    <Header setUser={setUser} />
      {/* <Searchbar /> */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome to EV Events</h1>
            <p className={styles.heroSubtitle}>
              Your premier destination for professional event management solutions
            </p>
            <p className={styles.heroDescription}>
              EV Events streamlines your event planning process with our comprehensive inventory management system.
              From corporate conferences to elegant weddings, we provide everything you need to create memorable experiences.
              Browse our extensive catalog of event items, manage your orders seamlessly, and track your event history all in one place.
            </p>
          </div>
        </section>
        {/* How It Works Section */}
        <section className={styles.howItWorksSection}>
          <h2 className={styles.sectionTitle}>How EV Events Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3>Browse Categories</h3>
              <p>Explore our organized categories below to find exactly what you need for your event, from audio equipment to decorations.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3>Add Items</h3>
              <p>Click on any category to view available items. Select quantities and add them to your checkout list with just a few clicks.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3>Review & Checkout</h3>
              <p>Review your selected items, adjust quantities as needed, and complete your order. All totals are calculated automatically.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>4</div>
              <h3>Track History</h3>
              <p>Access your profile to view order history, track previous events, and quickly reorder items for recurring events.</p>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Why Choose EV Events?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h3>Organized Categories</h3>
              <p>Find items quickly with our intuitive category system designed for event professionals.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Real-time Inventory</h3>
              <p>Always know what's available with our up-to-date inventory management system.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Order History</h3>
              <p>Keep track of all your past events and easily reorder items for similar occasions.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Flexible Quantities</h3>
              <p>Adjust item quantities on the fly to match your exact event requirements.</p>
            </div>
          </div>
        </section>
        {/* Categories Section */}
        <section className={styles.categoriesSection}>
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
          <p className={styles.sectionDescription}>
            Click on any category below to explore our full range of event items and start building your perfect event package.
          </p>
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
        </section>
        {/* Featured Items Section */}
        <section className={styles.itemsSection}>
          <h2 className={styles.sectionTitle}>Featured Items</h2>
          <p className={styles.sectionDescription}>
            Discover some of our most popular event items across all categories.
          </p>
          {loadingItems ? (
            <div className={styles.itemsGrid}>
              {items.map(item => (
                <div key={item._id} className={styles.itemCard}>
                  <img
                    src={item.picture || '/default-item.png'}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading items...</p>
          )}
          {/* Next Button
          <button
            className={styles.nextButton}
            onClick={handleNextItems}
            disabled={loadingItems}
          >
            View More Items
          </button> */}
        </section>
        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <h2>Ready to Plan Your Event?</h2>
          <p>Start browsing our categories above or use the search bar to find specific items for your upcoming event.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}