import React, { useState } from "react";
import styles from "./EditingPanel.module.css";
import SuggestionsPanel from "./SuggestionsPanel";
import CropPanel from "./CropPanel";
import AdjustPanel from "./AdjustPanel";
import FilterPanel from "./FilterPanel";

function EditingPanel({
  darkMode,
  isImageLoaded,
  activeEffect,
  adjustments,
  onApplySuggestion,
  onAdjustmentChange,
  onTransform,
  selectedFilter,
  onFilterChange,
  onDownload,
}) {
  const [activeSection, setActiveSection] = useState("suggestions");

  const sections = [
    { id: "suggestions", label: "Suggestions" },
    { id: "crop", label: "Crop & Transform" },
    { id: "adjust", label: "Adjust" },
    { id: "filters", label: "Filters" },
  ];

  return (
    <div className={styles.editingPanel} data-theme={darkMode ? "dark" : "light"}>
      {sections.map((section) => (
        <div key={section.id} className={styles.sectionWrapper}>
          <button
            className={`${styles.sectionHeader} ${
              activeSection === section.id ? styles.active : ""
            } ${!isImageLoaded ? styles.disabled : ""}`}
            onClick={() =>
              setActiveSection(
                activeSection === section.id ? null : section.id
              )
            }
            disabled={!isImageLoaded}
          >
            <span className={styles.sectionTitle}>{section.label}</span>
            <span
              className={`${styles.arrow} ${
                activeSection === section.id ? styles.expanded : ""
              }`}
            >
              ›
            </span>
          </button>

          {activeSection === section.id && (
            <div className={styles.sectionContent}>
              {section.id === "suggestions" && (
                <SuggestionsPanel
                  darkMode={darkMode}
                  isEnabled={isImageLoaded}
                  onApplySuggestion={onApplySuggestion}
                  activeEffect={activeEffect}
                />
              )}
              {section.id === "crop" && (
                <CropPanel darkMode={darkMode} isEnabled={isImageLoaded} onTransform={onTransform} />
              )}
              {section.id === "adjust" && (
                <AdjustPanel
                  darkMode={darkMode}
                  isEnabled={isImageLoaded}
                  adjustments={adjustments}
                  onAdjustmentChange={onAdjustmentChange}
                />
              )}
              {section.id === "filters" && (
                <FilterPanel
                  darkMode={darkMode}
                  isEnabled={isImageLoaded}
                  selectedFilter={selectedFilter}
                  onFilterChange={onFilterChange}
                  onDownload={onDownload}
                  disableDownload={!isImageLoaded}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default EditingPanel;
