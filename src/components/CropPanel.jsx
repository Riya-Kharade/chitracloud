import React from "react";
import styles from "./CropPanel.module.css";

function CropPanel({ darkMode, isEnabled = true, onTransform }) {
  return (
    <div className={`${styles.buttonGrid} ${!isEnabled ? styles.disabled : ""}`} data-theme={darkMode ? "dark" : "light"}>
      <button
        className={styles.button}
        onClick={() => onTransform("rotateLeft")}
        title="Rotate 90° left"
        disabled={!isEnabled}
      >
        ↻ Rotate Left
      </button>
      <button
        className={styles.button}
        onClick={() => onTransform("rotateRight")}
        title="Rotate 90° right"
        disabled={!isEnabled}
      >
        ↺ Rotate Right
      </button>
      <button
        className={styles.button}
        onClick={() => onTransform("flipH")}
        title="Flip horizontal"
        disabled={!isEnabled}
      >
        ⇌ Flip H
      </button>
      <button
        className={styles.button}
        onClick={() => onTransform("flipV")}
        title="Flip vertical"
        disabled={!isEnabled}
      >
        ⇅ Flip V
      </button>
    </div>
  );
}

export default CropPanel;
