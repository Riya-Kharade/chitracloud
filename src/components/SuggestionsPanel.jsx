import React from "react";
import styles from "./SuggestionsPanel.module.css";

function SuggestionsPanel({ darkMode, isEnabled = true, onApplySuggestion, activeEffect }) {
  const suggestions = [
    { id: "enhance", label: "Enhance", filter: "contrast(110%) brightness(110%)" },
    { id: "warm", label: "Warm", filter: "sepia(30%) saturate(120%)" },
    { id: "cool", label: "Cool", filter: "hue-rotate(180deg) saturate(120%)" },
    { id: "vivid", label: "Vivid", filter: "saturate(150%) contrast(120%)" },
    { id: "soft", label: "Soft", filter: "brightness(105%) blur(1px)" },
  ];

  return (
    <div className={`${styles.buttonGrid} ${!isEnabled ? styles.disabled : ""}`} data-theme={darkMode ? "dark" : "light"}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          className={`${styles.button} ${
            activeEffect === suggestion.id ? styles.active : ""
          }`}
          onClick={() => onApplySuggestion(suggestion.id, suggestion.filter)}
          disabled={!isEnabled}
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}

export default SuggestionsPanel;
