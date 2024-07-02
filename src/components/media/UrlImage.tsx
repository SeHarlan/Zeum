import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type ImageProps = {
  imageUrl: string;
  className?: string;
  alt?: string;
};
const AssetImage: React.FC<ImageProps> = ({ className, imageUrl, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => setError(true);
  const handleLoaded = () => setLoaded(true);

  return (
    <div
      className={twMerge(
        !loaded || error ? "bg-gray-500" : "bg-transparent",
        !loaded && !error ? "animate-pulse" : "",
        className
      )}
    >
      {error && <PhotoIcon className="w-[33%] h-auto" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        className={twMerge("w-full h-full object-contain", error && "hidden")}
        onError={handleError}
        onLoad={handleLoaded}
      />
    </div>
  );
};

export default AssetImage;
