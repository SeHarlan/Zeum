import React from "react";
import { twMerge } from "tailwind-merge";

interface VideoViewerProps {
  videoUrl: string;
  className?: string;
  onError?: (e: any) => void;
  onLoad?: () => void;
}

const VideoViewer: React.FC<VideoViewerProps> = ({
  onLoad,
  onError,
  className,
  videoUrl,
}) => {
  return (
    <div className={twMerge("w-full h-full", className)}>
      <video
        className="w-full h-full"
        src={videoUrl}
        onError={onError}
        onCanPlay={onLoad}
        autoPlay
        muted
        loop
      />
    </div>
  );
};

export default VideoViewer;
