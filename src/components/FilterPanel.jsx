import React from "react";
import styles from "./FilterPanel.module.css";

const FILTERS = [
  { value: "normal", label: "Normal", filter: "none" },
  { value: "grayscale", label: "Grayscale", filter: "grayscale(100%)" },
  { value: "sepia", label: "Sepia", filter: "sepia(100%)" },
  { value: "vintage", label: "Vintage", filter: "sepia(0.4) saturate(0.8)" },
  { value: "coolBlue", label: "Cool Blue", filter: "hue-rotate(200deg) saturate(1.2)" },
  { value: "warmSunset", label: "Warm Sunset", filter: "sepia(0.4) hue-rotate(20deg)" },
  { value: "dramatic", label: "Dramatic", filter: "contrast(1.4) saturate(1.2)" },
  { value: "fade", label: "Fade", filter: "brightness(1.1) opacity(0.8)" },
  { value: "highContrast", label: "High Contrast", filter: "contrast(1.6)" },
];

function FilterPanel({ darkMode, isEnabled = true, selectedFilter, onFilterChange, onDownload, disableDownload }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} data-theme={darkMode ? "dark" : "light"}>
      <div className={`${styles.buttonRow} ${!isEnabled ? styles.disabled : ""}`} data-theme={darkMode ? "dark" : "light"}>
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`${styles.filterButton} ${selectedFilter === item.value ? styles.active : ""}`}
            onClick={() => onFilterChange(item.value)}
            disabled={!isEnabled}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

    
    </div>
  );
}

export default FilterPanel;
