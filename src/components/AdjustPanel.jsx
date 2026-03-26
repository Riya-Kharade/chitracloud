import React from "react";
import styles from "./AdjustPanel.module.css";

function AdjustPanel({ darkMode, isEnabled = true, adjustments, onAdjustmentChange }) {
  const sliders = [
    { id: "brightness", label: "Brightness", min: -100, max: 100, default: 0 },
    { id: "contrast", label: "Contrast", min: -100, max: 100, default: 0 },
    { id: "saturation", label: "Saturation", min: -100, max: 100, default: 0 },
    { id: "warmth", label: "Warmth", min: -100, max: 100, default: 0 },
    { id: "highlights", label: "Highlights", min: -100, max: 100, default: 0 },
    { id: "shadows", label: "Shadows", min: -100, max: 100, default: 0 },
    { id: "exposure", label: "Exposure", min: -100, max: 100, default: 0 },
    { id: "whitePoint", label: "White Point", min: -100, max: 100, default: 0 },
  ];

  return (
    <div className={`${styles.sliderContainer} ${!isEnabled ? styles.disabled : ""}`} data-theme={darkMode ? "dark" : "light"}>
      {sliders.map((slider) => (
        <div key={slider.id} className={styles.sliderGroup}>
          <label className={styles.label}>
            {slider.label}
            <span className={styles.value}>
              {adjustments[slider.id] || slider.default}
            </span>
          </label>
          <input
            type="range"
            min={slider.min}
            max={slider.max}
            value={adjustments[slider.id] || slider.default}
            onChange={(e) =>
              onAdjustmentChange(slider.id, parseInt(e.target.value))
            }
            className={styles.slider}
            disabled={!isEnabled}
          />
        </div>
      ))}
    </div>
  );
}

export default AdjustPanel;
