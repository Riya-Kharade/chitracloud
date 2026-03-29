import React, { useMemo, useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import EditingPanel from "./components/EditingPanel";
import ImagePreview from "./components/ImagePreview";
import GalleryGrid from "./components/GalleryGrid";
import "./App.css";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getAdjustmentFilters(adjustments) {
  const {
    brightness = 0,
    contrast = 0,
    saturation = 0,
    warmth = 0,
    exposure = 0,
    highlights = 0,
    shadows = 0,
    whitePoint = 0
  } = adjustments;

  let filters = [];

  filters.push(`brightness(${100 + brightness + exposure}%)`);
  filters.push(`contrast(${100 + contrast}%)`);
  filters.push(`saturate(${100 + saturation}%)`);

  if (warmth !== 0) {
    filters.push(`hue-rotate(${warmth * 0.5}deg)`);
  }

  if (highlights !== 0) {
    filters.push(`brightness(${100 + highlights}%)`);
    filters.push(`contrast(${100 - highlights * 0.5}%)`);
  }

  if (shadows !== 0) {
    filters.push(`contrast(${100 + shadows}%)`);
    filters.push(`brightness(${100 + shadows * 0.3}%)`);
  }

  if (whitePoint !== 0) {
    filters.push(`brightness(${100 + whitePoint}%)`);
    filters.push(`saturate(${100 + whitePoint * 0.2}%)`);
  }

  return filters.join(" ");
}

function resolveImageMeta(image) {
  return new Promise((resolve) => {
    const temp = new Image();
    temp.crossOrigin = "anonymous";
    temp.src = image.url;

    temp.onload = () => {
      resolve({
        ...image,
        width: temp.width,
        height: temp.height,
      });
    };

    temp.onerror = () => {
      resolve({
        ...image,
        width: null,
        height: null,
      });
    };
  });
}

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [filterType, setFilterType] = useState("normal");
  const [darkMode, setDarkMode] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeEffect, setActiveEffect] = useState(null);
  const [suggestionFilter, setSuggestionFilter] = useState("");
  const [adjustments, setAdjustments] = useState({});
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(1);
  const [flipV, setFlipV] = useState(1);

  const uploadedFiles = useRef(new Set());

  // ✅ NEW: Fetch images from DB on load
  useEffect(() => {
    fetch("http://localhost:5000/images")
      .then((res) => res.json())
      .then(async (data) => {
        const imagesWithMeta = await Promise.all(
  data.map((img) =>
    resolveImageMeta({
      ...img,
      type: img.type || "original", // ⭐ IMPORTANT FIX
    })
  )
);
        setGallery(imagesWithMeta);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const combinedFilterStyle = useMemo(() => {
    let baseFilter = "";

    if (filterType === "grayscale") {
      baseFilter = "grayscale(100%)";
    } else if (filterType === "sepia") {
      baseFilter = "sepia(100%)";
    } else if (filterType === "vintage") {
      baseFilter = "sepia(0.4) saturate(0.8)";
    } else if (filterType === "coolBlue") {
      baseFilter = "hue-rotate(200deg) saturate(1.2)";
    } else if (filterType === "warmSunset") {
      baseFilter = "sepia(0.4) hue-rotate(20deg)";
    } else if (filterType === "dramatic") {
      baseFilter = "contrast(1.4) saturate(1.2)";
    } else if (filterType === "fade") {
      baseFilter = "brightness(1.1) opacity(0.8)";
    } else if (filterType === "highContrast") {
      baseFilter = "contrast(1.6)";
    }

    let allFilters = [baseFilter, suggestionFilter, getAdjustmentFilters(adjustments)]
      .filter(Boolean)
      .join(" ");

    return allFilters || "none";
  }, [filterType, suggestionFilter, adjustments]);

  const handleUpload = async (file) => {
    if (!file || uploading || uploadedFiles.current.has(file.name)) return;

    uploadedFiles.current.add(file.name);
    setUploading(true);
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // ✅ FIX: use backend id (not makeId)
      const withMeta = await resolveImageMeta({
        id: data.id,
        url: data.url,
        name: data.name || file.name,
        size: data.size || file.size,
      });

      setSelectedImage(withMeta);
      setGallery((prev) => [withMeta, ...prev]);
      setSuccessMessage("Image uploaded successfully.");
    } catch (error) {
      setSuccessMessage("Upload failed. Please try again.");
      uploadedFiles.current.delete(file.name);
    } finally {
      setUploading(false);
      setTimeout(() => setSuccessMessage(""), 2500);
    }
  };

 const downloadImage = () => {
  if (!selectedImage?.url) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = selectedImage.url;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.filter = combinedFilterStyle;
    ctx.drawImage(img, 0, 0);

    // ✅ DOWNLOAD
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    // ✅ UPLOAD EDITED IMAGE
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "edited.png");
      formData.append("type", "edited"); // ⭐ IMPORTANT

      await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Edited image saved");
    });
  };
};
  const deleteImage = async (id) => {
  await fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE",
  });

  setGallery((prev) => prev.filter((img) => img.id !== id));
};
  const handleApplySuggestion = (effectId, filterValue) => {
    setActiveEffect(effectId);
    setSuggestionFilter(filterValue);
  };

  const handleTransform = (type) => {
    if (type === "rotateLeft") {
      setRotation(prev => prev - 90);
    } 
    else if (type === "rotateRight") {
      setRotation(prev => prev + 90);
    } 
    else if (type === "flipH") {
      setFlipH(prev => prev * -1);
    } 
    else if (type === "flipV") {
      setFlipV(prev => prev * -1);
    }
  };

  const handleAdjustmentChange = (adjustmentId, value) => {
    setAdjustments((prev) => ({ ...prev, [adjustmentId]: value }));
  };
const originalImages = gallery.filter(
  img => !img.type || img.type === "original"
);

const editedImages = gallery.filter(
  img => img.type === "edited"
);
  return (
    <div className={`appShell ${darkMode ? "themeDark" : "themeLight"}`}>
      <main className="appContainer">
        <Header
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((prev) => !prev)}
        />

        <section className="contentGrid">
          <aside className="leftPane">
            <UploadCard
              onUpload={handleUpload}
              uploading={uploading}
              selectedName={selectedImage?.name}
              successMessage={successMessage}
            />

            <EditingPanel
              darkMode={darkMode}
              isImageLoaded={!!selectedImage}
              activeEffect={activeEffect}
              adjustments={adjustments}
              onApplySuggestion={handleApplySuggestion}
              onAdjustmentChange={handleAdjustmentChange}
              onTransform={handleTransform}
              selectedFilter={filterType}
              onFilterChange={setFilterType}
              onDownload={downloadImage}
            />

            <div className="downloadButtonContainer">
              <button
                className="downloadButton"
                onClick={downloadImage}
                disabled={!selectedImage}
              >
                ⬇ Download Image
              </button>
            </div>
          </aside>

          <section className="rightPane">
            <ImagePreview 
              image={selectedImage} 
              filterStyle={combinedFilterStyle}
              rotation={rotation}
              flipH={flipH}
              flipV={flipV}
            />
          </section>
        </section>

       <h2 style={{ marginTop: "20px" }}>📸 Original Images</h2>
<GalleryGrid
  images={originalImages}
  onSelect={setSelectedImage}
  onDelete={deleteImage}
/>

<h2 style={{ marginTop: "20px" }}>🎨 Edited Images</h2>
<GalleryGrid
  images={editedImages}
  onSelect={setSelectedImage}
  onDelete={deleteImage}
/>
      </main>
    </div>
  );
}

export default App;