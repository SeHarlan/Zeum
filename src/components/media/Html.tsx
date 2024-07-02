import React from "react";
import { twMerge } from "tailwind-merge";

interface HtmlViewerProps {
  htmlUrl: string;
  className?: string;
  onError?: (e: any) => void;
  onLoad?: () => void;
}

const HtmlViewer: React.FC<HtmlViewerProps> = ({
  onLoad,
  onError,
  className,
  htmlUrl,
}) => {
  return (
    <div className={twMerge("w-full h-full", className)}>
      <iframe
        className="w-full h-full"
        src={htmlUrl}
        onError={onError}
        onLoad={onLoad}
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default HtmlViewer;
