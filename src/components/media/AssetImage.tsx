import { AssetType } from "@/types/assets";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type ImageProps = {
  asset: AssetType;
  className?: string;
  imageClassName?: string;
  onLoad?: (e: HTMLImageElement) => void;
};
const AssetImage: React.FC<ImageProps> = ({ asset, className, imageClassName, onLoad }) => {
  const { media, name } = asset;
  
  const [url, setUrl] = useState(media.imageCdnUrl || media.imageUrl);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => { 
    if (url === media.imageCdnUrl) {
      setUrl(media.imageUrl)
      setLoaded(false)
    } else {
      setError(true)
    }
  }

  const handleLoaded: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setLoaded(true);
    setError(false);
    onLoad && onLoad(e.currentTarget);
  };
  return (
    <div className={twMerge(
      !loaded || error ? "bg-gray-500" : "bg-transparent",
      !loaded && !error ? "animate-pulse" : "",
      className)}
    >
      {error && <PhotoIcon className="w-[33%] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={name}
        loading="lazy"
        className={twMerge("w-full h-full object-contain", className, error && "hidden")}
        onError={handleError}
        onLoad={handleLoaded}
      />
    </div>
  )
};

export default AssetImage
