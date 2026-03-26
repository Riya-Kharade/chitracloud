import React from "react";
import styles from "./ImagePreview.module.css";

function humanFileSize(size) {
  if (!size || Number.isNaN(size)) return "Unknown";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function ImagePreview({ image, filterStyle, rotation = 0, flipH = 1, flipV = 1 }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>Preview</h2>

      <div className={styles.previewWrap}>
        {image ? (
          <img 
            key={image.url}
            className={styles.previewImage} 
            src={image.url} 
            alt={image.name || "preview"} 
            crossOrigin="anonymous" 
            style={{ 
              filter: filterStyle,
              transform: `rotate(${rotation}deg) scale(${flipH}, ${flipV})`,
              transition: "0.3s ease"
            }} 
          />
        ) : (
          <p className={styles.empty}>No image selected</p>
        )}
      </div>

      <div className={styles.infoGrid}>
        <div>
          <p className={styles.label}>File Name</p>
          <p className={styles.value}>{image?.name || "-"}</p>
        </div>
        <div>
          <p className={styles.label}>Size</p>
          <p className={styles.value}>{humanFileSize(image?.size)}</p>
        </div>
        <div>
          <p className={styles.label}>Resolution</p>
          <p className={styles.value}>{image?.width && image?.height ? `${image.width} x ${image.height}` : "-"}</p>
        </div>
      </div>
    </section>
  );
}

export default ImagePreview;
