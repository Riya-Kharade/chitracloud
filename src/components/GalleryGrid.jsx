import React from "react";
import GalleryItem from "./GalleryItem";
import styles from "./GalleryGrid.module.css";

function GalleryGrid({ images, onSelect, onDelete }) {
  return (
    <section className={styles.gallerySection}>
      <div className={styles.topLine}>
        <h2 className={styles.heading}>Gallery</h2>
        <p className={styles.count}>{images.length} image(s)</p>
      </div>

      <div className={styles.grid}>
        {images.map((item) => (
          <GalleryItem key={item.id} item={item} onSelect={onSelect} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}

export default GalleryGrid;
