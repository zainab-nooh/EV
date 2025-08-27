import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoryList.module.scss";
const CategoryList = ({ categories, selectedCategory, onCategorySelect }) => {
  if (!categories || categories.length === 0) return <p>No Category found.</p>;
  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          item={category}
          isSelected={selectedCategory?._id === category._id}
          onSelect={onCategorySelect}
        />
      ))}
    </div>
  );
};
export default CategoryList;






