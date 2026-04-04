import React, { useMemo, useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import EditingPanel from "./components/EditingPanel";
import ImagePreview from "./components/ImagePreview";
import GalleryGrid from "./components/GalleryGrid";
import AuthPage from "./components/AuthPage";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
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
  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
const [resizeHeight, setResizeHeight] = useState("");
const [history, setHistory] = useState([]);
const [currentIndex, setCurrentIndex] = useState(-1);
  const uploadedFiles = useRef(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = localStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState("home");

  console.log("Current user:", userId);

  // ✅ NEW: Fetch images from DB on load
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:5000/images?userId=${userId}`)
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
  }, [userId]);

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
    const userId = localStorage.getItem("userId");
    console.log("Uploading for user:", userId);

    if (!file || uploading || uploadedFiles.current.has(file.name)) return;

    uploadedFiles.current.add(file.name);
    setUploading(true);
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId);

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
      saveToHistory(withMeta);
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
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0);
    ctx.filter = combinedFilterStyle;
    ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";
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
        const userId = localStorage.getItem("userId");

        formData.append("type", "edited");
        formData.append("userId", userId);

        await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        console.log("Edited image saved");
      });
    };
  };

  const handleResize = () => {
    if (!selectedImage || !resizeWidth || !resizeHeight) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selectedImage.url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const targetWidth = parseInt(resizeWidth);
      const targetHeight = parseInt(resizeHeight);

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 🔥 IMPORTANT FIX (THIS WAS MISSING)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 🔥 Better scaling
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const resizedUrl = canvas.toDataURL("image/png", 1.0); // max quality

      const newImage = {
        ...selectedImage,
        id: Date.now(),
        url: resizedUrl,
        name: "resized.png",
        type: "edited",
        uploadedAt: new Date().toISOString(),
      };

      setSelectedImage(newImage);
      setGallery((prev) => [newImage, ...prev]);
      saveToHistory(newImage);
    };
  };

  //undo redo

  const saveToHistory = (newImage) => {
    setHistory((prevHistory) => {
      const updated = prevHistory.slice(0, currentIndex + 1);
      updated.push(newImage);

      setCurrentIndex(updated.length - 1);
      return updated;
    });
  };

  const handleUndo = () => {
    if (currentIndex <= 0) return;

    const newIndex = currentIndex - 1;
    const prevState = history[newIndex];

    setCurrentIndex(newIndex);

    setSelectedImage(prevState.image || prevState);

    setRotation(prevState.rotation || 0);
    setFlipH(prevState.flipH || 1);
    setFlipV(prevState.flipV || 1);

    setFilterType(prevState.filterType || "normal");
    setAdjustments(prevState.adjustments || {});

    setSuggestionFilter(prevState.suggestionFilter || "");
  };

  const handleRedo = () => {
    if (currentIndex >= history.length - 1) return;

    const newIndex = currentIndex + 1;
    const nextState = history[newIndex];

    setCurrentIndex(newIndex);

    setSelectedImage(nextState.image || nextState);

    setRotation(nextState.rotation || 0);
    setFlipH(nextState.flipH || 1);
    setFlipV(nextState.flipV || 1);

    setFilterType(nextState.filterType || "normal");
    setAdjustments(nextState.adjustments || {});

    setSuggestionFilter(nextState.suggestionFilter || "");
  };


  // delete and rename
};

const handleResize = () => {
  if (!selectedImage || !resizeWidth || !resizeHeight) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = selectedImage.url;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const targetWidth = parseInt(resizeWidth);
    const targetHeight = parseInt(resizeHeight);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // 🔥 IMPORTANT FIX (THIS WAS MISSING)
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 🔥 Better scaling
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const resizedUrl = canvas.toDataURL("image/png", 1.0); // max quality

    const newImage = {
      ...selectedImage,
      id: Date.now(),
      url: resizedUrl,
      name: "resized.png",
      type: "edited",
      uploadedAt: new Date().toISOString(),
    };

    setSelectedImage(newImage);
    setGallery((prev) => [newImage, ...prev]);
    saveToHistory(newImage);
  };
};

//undo redo

const saveToHistory = (newImage) => {
  setHistory((prevHistory) => {
    const updated = prevHistory.slice(0, currentIndex + 1);
    updated.push(newImage);

    setCurrentIndex(updated.length - 1);
    return updated;
  });
};

const handleUndo = () => {
  if (currentIndex <= 0) return;

  const newIndex = currentIndex - 1;
  const prevState = history[newIndex];

  setCurrentIndex(newIndex);

  setSelectedImage(prevState.image || prevState);

  setRotation(prevState.rotation || 0);
  setFlipH(prevState.flipH || 1);
  setFlipV(prevState.flipV || 1);

  setFilterType(prevState.filterType || "normal");
  setAdjustments(prevState.adjustments || {});

  setSuggestionFilter(prevState.suggestionFilter || "");
};

const handleRedo = () => {
  if (currentIndex >= history.length - 1) return;

  const newIndex = currentIndex + 1;
  const nextState = history[newIndex];

  setCurrentIndex(newIndex);

  setSelectedImage(nextState.image || nextState);

  setRotation(nextState.rotation || 0);
  setFlipH(nextState.flipH || 1);
  setFlipV(nextState.flipV || 1);

  setFilterType(nextState.filterType || "normal");
  setAdjustments(nextState.adjustments || {});

  setSuggestionFilter(nextState.suggestionFilter || "");
};


// delete and rename
  const deleteImage = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });

    setGallery((prev) => prev.filter((img) => img.id !== id));
  };
  const handleRename = async (id, newName) => {
    // ✅ Update in backend (API)
    await fetch(`http://localhost:5000/rename/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });

    // ✅ Update frontend state
    setGallery((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, name: newName } : img
      )
    );
  };
  const handleApplySuggestion = (effectId, filterValue) => {
    setActiveEffect(effectId);
    setSuggestionFilter(filterValue);

    saveToHistory({
      image: selectedImage,
      filterType,
      adjustments,
      suggestionFilter: filterValue,
      rotation,
      flipH,
      flipV
    });
  };


  const handleTransform = (type) => {
    let newRotation = rotation;
    let newFlipH = flipH;
    let newFlipV = flipV;

    if (type === "rotateLeft") {
      newRotation = rotation - 90;
      setRotation(newRotation);
    }
    else if (type === "rotateRight") {
      newRotation = rotation + 90;
      setRotation(newRotation);
    }
    else if (type === "flipH") {
      newFlipH = flipH * -1;
      setFlipH(newFlipH);
    }
    else if (type === "flipV") {
      newFlipV = flipV * -1;
      setFlipV(newFlipV);
    }

    // ✅ Save FULL state for undo/redo
    saveToHistory({
      ...selectedImage,
      rotation: newRotation,
      flipH: newFlipH,
      flipV: newFlipV
    });
  };
  const handleAdjustmentChange = (adjustmentId, value) => {
    setAdjustments((prev) => ({
      ...prev,
      [adjustmentId]: value
    }));
  };
  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter);

    saveToHistory({
      image: selectedImage,   // ✅ important
      filterType: newFilter,
      adjustments,
      rotation,
      flipH,
      flipV
    });
  };


  const originalImages = gallery.filter(
    img => !img.type || img.type === "original"
  );

  const editedImages = gallery.filter(
    img => img.type === "edited"
  );
  setGallery((prev) => prev.filter((img) => img.id !== id));
};
const handleRename = async (id, newName) => {
  // ✅ Update in backend (API)
  await fetch(`http://localhost:5000/rename/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });

  // ✅ Update frontend state
  setGallery((prev) =>
    prev.map((img) =>
      img.id === id ? { ...img, name: newName } : img
    )
  );
};
const handleApplySuggestion = (effectId, filterValue) => {
  setActiveEffect(effectId);
  setSuggestionFilter(filterValue);

  saveToHistory({
    image: selectedImage,
    filterType,
    adjustments,
    suggestionFilter: filterValue,
    rotation,
    flipH,
    flipV
  });
};

  
const handleTransform = (type) => {
  let newRotation = rotation;
  let newFlipH = flipH;
  let newFlipV = flipV;

  if (type === "rotateLeft") {
    newRotation = rotation - 90;
    setRotation(newRotation);
  } 
  else if (type === "rotateRight") {
    newRotation = rotation + 90;
    setRotation(newRotation);
  } 
  else if (type === "flipH") {
    newFlipH = flipH * -1;
    setFlipH(newFlipH);
  } 
  else if (type === "flipV") {
    newFlipV = flipV * -1;
    setFlipV(newFlipV);
  }

  // ✅ Save FULL state for undo/redo
  saveToHistory({
    ...selectedImage,
    rotation: newRotation,
    flipH: newFlipH,
    flipV: newFlipV
  });
};
const handleAdjustmentChange = (adjustmentId, value) => {
  setAdjustments((prev) => ({
    ...prev,
    [adjustmentId]: value
  }));
};
  const handleFilterChange = (newFilter) => {
  setFilterType(newFilter);

  saveToHistory({
    image: selectedImage,   // ✅ important
    filterType: newFilter,
    adjustments,
    rotation,
    flipH,
    flipV
  });
};


const originalImages = gallery.filter(
  img => !img.type || img.type === "original"
);

const editedImages = gallery.filter(
  img => img.type === "edited"
);
  return (
    <BrowserRouter>

<div className={darkMode ? "themeDark" : "themeLight"}>
        <Header

          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((prev) => !prev)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          isAuthenticated={isAuthenticated}
          onLogout={() => {
            localStorage.removeItem("userId");
            setIsAuthenticated(false);
            setCurrentPage("home");
          }}
        />
        

        {/* 🏠 HOME */}
        {currentPage === "home" && (
          <Home
            setCurrentPage={setCurrentPage}
            isAuthenticated={isAuthenticated}
          />
        )}
        {currentPage === "contact" && <Contact />}

        {/* 📖 ABOUT */}
        {currentPage === "about" && (
          <About />
        )}

        {/* 🔐 AUTH */}
        {currentPage === "auth" && (
          <AuthPage onSuccess={() => {
            setIsAuthenticated(true);
            setCurrentPage("editor");
          }} />
        )}


        {currentPage === "conversion" && (
          isAuthenticated ? (
            <div style={{ color: "white", padding: "50px" }}>
              Conversion Page
            </div>
          ) : (
            <AuthPage onSuccess={() => {
              setIsAuthenticated(true);
              setCurrentPage("conversion");
            }} />
          )
        )}


        {/* ✏️ EDITOR */}
        {currentPage === "editor" && (
          isAuthenticated ? (
            <main className="appContainer">

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
                    onFilterChange={handleFilterChange}
                    onDownload={downloadImage}
                    resizeWidth={resizeWidth}
                    setResizeWidth={setResizeWidth}
                    resizeHeight={resizeHeight}
                    setResizeHeight={setResizeHeight}
                    onResize={handleResize}
                  />

                  <div className="undoRedoContainer">
                    <button
                      onClick={handleUndo}
                      disabled={currentIndex <= 0}
                      className="undoBtn"
                    >
                      Undo
                    </button>

                    <button
                      onClick={handleRedo}
                      disabled={currentIndex >= history.length - 1}
                      className="redoBtn"
                    >
                      Redo
                    </button>
                  </div>

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
                onRename={handleRename}
              />

              <h2 style={{ marginTop: "20px" }}>🎨 Edited Images</h2>
              <GalleryGrid
                images={editedImages}
                onSelect={setSelectedImage}
                onDelete={deleteImage}
                onRename={handleRename}
              />

            </main>
          ) : (
            <AuthPage onSuccess={() => {
              setIsAuthenticated(true);
              setCurrentPage("editor");
            }} />


          )
        )}

      </div>
    </BrowserRouter>


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
            onFilterChange={handleFilterChange}
              onDownload={downloadImage}

              resizeWidth={resizeWidth}
setResizeWidth={setResizeWidth}
resizeHeight={resizeHeight}
setResizeHeight={setResizeHeight}

onResize={handleResize}
            />
<div className="undoRedoContainer">
  <button
    onClick={handleUndo}
    disabled={currentIndex <= 0}
    className="undoBtn"
  >
    Undo
  </button>

  <button
    onClick={handleRedo}
    disabled={currentIndex >= history.length - 1}
    className="redoBtn"
  >
    Redo
  </button>
</div>
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
  onRename={handleRename}   
/>

<h2 style={{ marginTop: "20px" }}>🎨 Edited Images</h2>
<GalleryGrid
  images={editedImages}
  onSelect={setSelectedImage}
  onDelete={deleteImage}
  onRename={handleRename}   
/>
      </main>
    </div>
  );
}



export default App;