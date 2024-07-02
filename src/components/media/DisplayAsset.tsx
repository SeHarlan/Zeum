import { AssetType } from "@/types/assets";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import AssetImage from "./AssetImage";
import HtmlViewer from "./Html";
import ModelViewer from "./VrModel";
import VideoViewer from "./Video";

type DisplayAssetProps = {
  asset: AssetType;
  className?: string;
  onlyImage?: boolean;
  onImageLoad?: (e: HTMLImageElement) => void;
};


const DisplayAssetMedia: React.FC<DisplayAssetProps> = ({ asset, className, onlyImage, onImageLoad }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const htmlUrl = asset?.media?.htmlUrl;
  const vrUrl = asset?.media?.vrUrl;
  const videoUrl = asset?.media?.videoUrl;

  const useAltMedia = !onlyImage && Boolean(htmlUrl || vrUrl || videoUrl);
  
  return (
    <div className={twMerge("relative", className)}>
      <AssetImage
        asset={asset}
        className={twMerge(
          useAltMedia && "absolute inset-0 z-10",
          (useAltMedia && mediaLoaded) ? "hidden" : "block",
          "w-full h-full",
        )}
        onLoad={onImageLoad}
      />

      {!onlyImage
        ? <>
            {htmlUrl && <HtmlViewer htmlUrl={htmlUrl} onLoad={() => setMediaLoaded(true)} />}
            {vrUrl && <ModelViewer vrUrl={vrUrl} onLoad={() => setMediaLoaded(true)} />}
            {videoUrl && <VideoViewer videoUrl={videoUrl} onLoad={() => setMediaLoaded(true)} />}
          </>
        : null
      }

    </div>
  )
}

export default DisplayAssetMedia