import {ChangeEvent, MouseEvent, useEffect, useRef, useState} from "react";
import Sidebar from "../components/Sidebar";
import '../styles/editor.css';

function ImageUploader() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [selection, setSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [mouseReleased, setMouseReleased] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCropped, setIsCropped] = useState(false);
  const [originalImages, setOriginalImages] = useState<string[]>([]);

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLImageElement).getBoundingClientRect();
    setDragging(true);
    setMouseReleased(false);
    setSelection({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: 0,
      height: 0,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging && !mouseReleased) {
      const rect = (e.target as HTMLImageElement).getBoundingClientRect();
      const newWidth = e.clientX - selection.x - rect.left;
      const newHeight = e.clientY - selection.y - rect.top;
      setSelection((sel) => ({
        ...sel,
        width: newWidth,
        height: newHeight,
      }));
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setDragging(false);
    // Do not reset the selection if mouse leaves the image
    if (e.type !== "mouseleave") {
      // Reset the selection if there's no actual drag
      if (selection.width === 0 && selection.height === 0) {
        setSelection({ x: 0, y: 0, width: 0, height: 0 });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    e.preventDefault();
    const rect = (e.target as HTMLImageElement).getBoundingClientRect();
    setDragging(true);
    setMouseReleased(false);
    setSelection({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      width: 0,
      height: 0,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (dragging && !mouseReleased) {
      const rect = (e.target as HTMLImageElement).getBoundingClientRect();
      const newWidth = e.touches[0].clientX - selection.x - rect.left;
      const newHeight = e.touches[0].clientY - selection.y - rect.top;
      setSelection((sel) => ({
        ...sel,
        width: newWidth,
        height: newHeight,
      }));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    setDragging(false);
    if (selection.width === 0 && selection.height === 0) {
      setSelection({ x: 0, y: 0, width: 0, height: 0 });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setImages(originalImages); // Reset to original state
      setIsCropped(false); // Reset cropped state
    } else if (event.key === "ArrowLeft") {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
      setImages(originalImages); // Reset to original state
      setIsCropped(false); // Reset cropped state
    }
  };

  const handleCrop = () => {
    // Ensure that imageRef and selection are valid
    if (
        imageRef.current &&
        imageRef.current.complete &&
        selection.width > 0 &&
        selection.height > 0
    ) {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = selection.width;
      canvas.height = selection.height;
      const ctx = canvas.getContext("2d");
      if (ctx == null) {
        console.error("Missing context for crop");
        return;
      }

      try {
        // Draw the selected portion of the image onto the canvas
        ctx.drawImage(
            imageRef.current,
            selection.x,
            selection.y,
            selection.width,
            selection.height,
            0,
            0,
            selection.width,
            selection.height
        );

        // Extract the data URL of the canvas
        const croppedImageDataUrl = canvas.toDataURL();

        // Update the current image with the cropped data
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[currentImage] = croppedImageDataUrl;
          setIsCropped(true);
          return newImages;
        });
      } catch (error) {
        console.error("Failed to crop the image", error);
      }
    }

    // Clear the selection
    setSelection({ x: 0, y: 0, width: 0, height: 0 });

    // Set the focus to the container div
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  useEffect(() => {
    // Add a listener to the document for the mouseup event
    const handleGlobalMouseUp = () => {
      setDragging(false);
      setMouseReleased(true);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [images]);

  useEffect(() => {
    // Clear selection when changing image and reset dragging state
    setSelection({ x: 0, y: 0, width: 0, height: 0 });
    setDragging(false);
    // Attach the mouseleave and touchcancel event listeners
    if (imageRef.current) {
      imageRef.current.addEventListener("mouseleave", handleMouseUp as any);
      imageRef.current.addEventListener("touchcancel", handleTouchEnd as any);
    }
    // Detach the mouseleave and touchcancel event listeners when the component unmounts or the image changes
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("mouseleave", handleMouseUp as any);
        imageRef.current.removeEventListener("touchcancel", handleTouchEnd as any);
      }
    };
  }, [currentImage]);

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.setAttribute('webkitdirectory', '');
    }
  }, []);

  const handleLoadImages = () => {
    // This is here to ensure that the user is grants html5 canvas permissions here rather than when cropping,
    // because that breaks the crop
    const dummyCanvas = document.createElement("canvas");
    dummyCanvas.width = 1;
    dummyCanvas.height = 1;
    const dummyCtx = dummyCanvas.getContext("2d");
    if (dummyCtx == null) {
      console.warn("Could not create dummy context for permissions");
      return;
    }
    dummyCtx.fillStyle = 'white';
    dummyCtx.fillRect(0, 0, 1, 1);
    try {
      dummyCanvas.toDataURL();
      // Open the file dialog
      if (inputFileRef.current) {
        inputFileRef.current.click();
      }
    } catch (error) {
      console.warn("Failed to trigger permission prompt with dummy canvas", error);
    }
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const imagePromises = Array.from(files).filter(file => file.type.startsWith('image/')).map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((imageData: string[]) => {
      setImages(imageData);
      setOriginalImages(imageData);
    });
  };

  return (
      <div ref={containerRef} tabIndex={-1}> {/* Add ref and tabIndex here */}
        <p>
          All files are stored locally on your computer. Use back and forward arrow keys to navigate,
          and click and drag (press and drag on a touchscreen) to change selection size.
        </p>
        <div className="action-bar">
          <button onClick={handleLoadImages}>Load Images</button>
          <input ref={inputFileRef} type="file" onChange={handleFiles} multiple style={{ display: 'none' }} />
          <button onClick={handleCrop} disabled={selection.width <= 0 || selection.height <= 0}>
            Crop
          </button>
          <button disabled={!isCropped}>
            Save
          </button>
        </div>
        {images.length > 0 && (
            <div style={{ position: 'relative' }}>
              <img
                  ref={imageRef}
                  src={images[currentImage]}
                  alt=""
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ userSelect: 'none', maxWidth: '100%', maxHeight: '100%' }}
              />
              {selection.width > 0 && selection.height > 0 && (
                  <div
                      style={{
                        border: '2px dashed #444',
                        position: 'absolute',
                        top: selection.y,
                        left: selection.x,
                        width: selection.width,
                        height: selection.height,
                        pointerEvents: 'none',
                      }}
                  ></div>
              )}
            </div>
        )}
      </div>
  );
}

export default function EditorRoute() {
  return (
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <ImageUploader />
        </main>
      </div>
  );
}