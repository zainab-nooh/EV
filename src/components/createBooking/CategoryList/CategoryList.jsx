import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoryList.module.scss";

const CategoryList = ({ categories }) => {
  if (!categories || categories.length === 0) return <p>No Category found.</p>;

  return (
    <div className={styles.ItemDetail}>
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}  // ✅ CORRECTED PROP NAME
        />
      ))}
    </div>
  );
};

export default CategoryList;
