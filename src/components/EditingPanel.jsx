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
  resizeWidth,
setResizeWidth,
resizeHeight,
setResizeHeight,
onResize   
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
            disabled={false}
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

         {(activeSection === section.id || !isImageLoaded) && (
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
  <>
    <CropPanel
      darkMode={darkMode}
      isEnabled={isImageLoaded}
      onTransform={onTransform}
    />

    {/* 🔧 Resize Section */}
    <div style={{ marginTop: "15px" }}>
      <h4 style={{ color: "#D0B49F" }}>Resize</h4>
<input
  type="number"
  placeholder="Width"
  value={resizeWidth}
  onChange={(e) => setResizeWidth(e.target.value)}
  style={{ marginRight: "10px", padding: "6px" }}
/>

<input
  type="number"
  placeholder="Height"
  value={resizeHeight}
  onChange={(e) => setResizeHeight(e.target.value)}
  style={{ padding: "6px" }}
/>

<button
  onClick={onResize}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#D0B49F",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Apply Resize
</button>

    </div>
  </>
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
