import React from "react";
import styles from "./GalleryItem.module.css";

function GalleryItem({ item, onSelect, onDelete }) {
  return (
    <article className={styles.card}>
      <button type="button" className={styles.thumbButton} onClick={() => onSelect(item)}>
        <img src={item.url} alt={item.name || "gallery item"} className={styles.image} />
      </button>

      <button type="button" className={styles.deleteButton} onClick={() => onDelete(item.id)} aria-label="Delete image">
        X
      </button>
    </article>
  );
}

export default GalleryItem;
