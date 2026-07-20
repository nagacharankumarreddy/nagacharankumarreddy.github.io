import { useState } from "react";
import type { ComponentType } from "react";
import type { LightboxExternalProps, Plugin } from "yet-another-react-lightbox";
import { readerConfig } from "../config/readerConfig";

interface ZoomableImageProps {
  src: string;
  alt?: string;
}

let lightboxModulesPromise: Promise<{
  Lightbox: ComponentType<LightboxExternalProps>;
  Zoom: Plugin;
}> | null = null;

const loadLightboxModules = () => {
  if (!lightboxModulesPromise) {
    lightboxModulesPromise = Promise.all([
      import("yet-another-react-lightbox"),
      import("yet-another-react-lightbox/plugins/zoom"),
      import("yet-another-react-lightbox/styles.css"),
    ]).then(([lightboxModule, zoomModule]) => ({
      Lightbox: lightboxModule.default,
      Zoom: zoomModule.default,
    }));
  }
  return lightboxModulesPromise;
};

export const ZoomableImage = ({ src, alt }: ZoomableImageProps) => {
  const [lightboxModules, setLightboxModules] = useState<{
    Lightbox: ComponentType<LightboxExternalProps>;
    Zoom: Plugin;
  } | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const zoomEnabled = readerConfig.images.clickToZoom;

  const handleClick = async () => {
    if (!zoomEnabled) return;
    const modules = await loadLightboxModules();
    setLightboxModules(modules);
    setIsZoomOpen(true);
  };

  return (
    <div className="zoomable-image">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onClick={zoomEnabled ? handleClick : undefined}
        style={zoomEnabled ? { cursor: "zoom-in" } : undefined}
      />
      {isZoomOpen && lightboxModules && (
        <lightboxModules.Lightbox
          open
          close={() => setIsZoomOpen(false)}
          slides={[{ src, alt }]}
          plugins={[lightboxModules.Zoom]}
          zoom={{ maxZoomPixelRatio: 4 }}
        />
      )}
    </div>
  );
};
