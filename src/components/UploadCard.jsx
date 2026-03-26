import React, { useRef, useState } from "react";
import styles from "./UploadCard.module.css";

function UploadCard({ onUpload, uploading, selectedName, successMessage }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const pickFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>Upload Image</h2>
      <div
        className={`${styles.dropZone} ${dragActive ? styles.dropZoneActive : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <div className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M7.5 8.5L12 4L16.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 14.5V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        <p className={styles.dropText}>Drag and drop image here</p>
        <button type="button" className={styles.browseButton} onClick={pickFile} disabled={uploading}>
          Browse File
        </button>
      </div>

      <input ref={inputRef} type="file" accept="image/*" className={styles.input} onChange={handleInputChange} />

      <p className={styles.filename}>Selected: {selectedName || "No file selected"}</p>

      {uploading && (
        <div className={styles.uploadState}>
          <span className={styles.spinner} aria-hidden="true" />
          Uploading to AWS S3...
        </div>
      )}

      {!uploading && successMessage && <p className={styles.success}>{successMessage}</p>}
    </section>
  );
}

export default UploadCard;
