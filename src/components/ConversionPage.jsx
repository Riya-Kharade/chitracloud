import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "./ConversionPage.css";

// ✅ CDN worker (stable)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

function ConversionPage() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");
  const [output, setOutput] = useState(null);

  const handleConvert = async () => {
    if (!file) {
      alert("Upload file first");
      return;
    }

    // ================= PDF → IMAGE =================
    if (file.type === "application/pdf") {
      try {
        const fileReader = new FileReader();

        fileReader.onload = async function () {
          try {
            const typedArray = new Uint8Array(this.result);

            const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 2 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
              canvasContext: context,
              viewport,
            }).promise;

            const imageData = canvas.toDataURL(`image/${format}`);
            setOutput(imageData);

          } catch (err) {
            console.error(err);
            alert("PDF processing failed ❌");
          }
        };

        fileReader.readAsArrayBuffer(file);

      } catch (err) {
        console.error(err);
        alert("PDF conversion failed ❌");
      }
    }

    // ================= IMAGE → IMAGE =================
    else {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const converted = canvas.toDataURL(`image/${format}`);
        setOutput(converted);
      };
    }
  };

  return (
    <div className="converterContainer">
      <h2 className="converterTitle">Image / PDF Converter</h2>

      <div className="converterCard">

        {/* 🔥 LEFT PANEL */}
        <div className="leftPanel">

          <input
            className="fileInput"
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setOutput(null); // reset preview on new upload
            }}
          />

          <div className="selectBox">
            <label>Select Format: </label>
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="png">PNG</option>
              <option value="jpeg">JPG</option>
            </select>
          </div>

          <button className="convertBtn" onClick={handleConvert}>
            Convert
          </button>

        </div>

        {/* 🔥 RIGHT PANEL */}
        <div className="rightPanel">

          {output ? (
            <>
              <h3>Preview:</h3>

              <img src={output} alt="converted" className="outputImage" />

              <a href={output} download="converted-image">
                <button className="downloadBtn">Download</button>
              </a>
            </>
          ) : (
            <div className="emptyPreview">
              <p>Preview will appear here after conversion</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ConversionPage;