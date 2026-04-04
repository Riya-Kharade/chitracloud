import React, { useState } from "react";
import styles from "./GalleryGrid.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
function GalleryGrid({ images, onSelect, onDelete, onRename }) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  // 🔍 Search Filter
  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✏️ Rename Handler
  const handleRename = (id) => {
    if (newName.trim() !== "") {
      onRename(id, newName);
      setEditingId(null);
      setNewName("");
    }
  };

  return (
    <div className={styles.galleryWrapper}>
      
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search images..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />

      <div className={styles.galleryGrid}>
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <div key={img.id} className={styles.card}>
              
              <img
                src={img.url}
                alt={img.name}
                onClick={() => onSelect(img)}
              />

              <div className={styles.info}>
                
                {/* ✏️ Rename UI */}
                {editingId === img.id ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className={styles.renameInput}
                    />
                    <button onClick={() => handleRename(img.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                   <p>{img.name}</p>
<small className={styles.time}>
  {img.uploadedAt
    ? dayjs(img.uploadedAt).fromNow()
    : "Just now"}
</small>

                    <button
                      onClick={() => {
                        setEditingId(img.id);
                        setNewName(img.name);
                      }}
                    >
                      Rename
                    </button>

                    <button onClick={() => onDelete(img.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
}

export default GalleryGrid;