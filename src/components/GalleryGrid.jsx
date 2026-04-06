import React, { useState } from "react";
import styles from "./GalleryGrid.module.css";

function GalleryGrid({ images, onSelect, onDelete, onRename }) {
  const [renameId, setRenameId] = useState(null);
  const [newName, setNewName] = useState("");

  return (
    <div className={styles.galleryWrapper}>
      <h2>Gallery</h2>

      <div className={styles.galleryGrid}>
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className={styles.card}>
              
              {/* Image */}
              <img
                src={img.url}
                alt={img.name}
                onClick={() => onSelect(img)}
              />

              {/* Image Name */}
              <p className={styles.imageName}>{img.name}</p>

              {/* Buttons */}
              <div className={styles.imageActions}>
                
                {/* Rename */}
                <button
                  className={styles.renameBtn}
                  onClick={() => {
                    setRenameId(img.id);
                    setNewName(img.name);
                  }}
                >
                  Rename
                </button>

                {/* Delete */}
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(img.id)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        ) : (
          <p className={styles.noImages}>No images found</p>
        )}
      </div>

      {/* ✅ RENAME MODAL */}
      {renameId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            
            <h3>Rename Image</h3>

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
            />

            <div className={styles.modalActions}>
              
              <button
                className={styles.saveBtn}
                onClick={() => {
                  onRename(renameId, newName);
                  setRenameId(null);
                  setNewName("");
                }}
              >
                Save
              </button>

              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setRenameId(null);
                  setNewName("");
                }}
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryGrid;