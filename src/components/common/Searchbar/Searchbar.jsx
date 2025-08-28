import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Searchbar/Searchbar.module.scss";
const token = localStorage.getItem('token');

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
const handleSearch = async (query) => {
  try {
    const response = await fetch(`/api/items/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    console.log(data.items); // array of matched items
  } catch (err) {
    console.error(err);
  }
};

  const handleResultClick = (type, id) => {
    if (type === "category") {
      navigate(`/categories/${id}`);
    } else if (type === "item") {
      navigate(`/items/${id}`);
    }
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          placeholder="Search categories or items..."
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          🔍
        </button>
      </form>

      {loading && <p>Searching...</p>}

      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((result) => (
            <li
              key={result._id}
              className={styles.resultItem}
              onClick={() => handleResultClick(result.type, result._id)}
            >
              <img
                src={result.image || "/default.png"}
                alt={result.name}
                className={styles.resultImage}
              />
              <span>
                {result.name} <em>({result.type})</em>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
