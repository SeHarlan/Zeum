import "@google/model-viewer";

import { twMerge } from "tailwind-merge";

// ref: https://modelviewer.dev/docs/index.html#augmentedreality-attributes

type ModelViewerProps = {
  vrUrl: string;
  className?: string;
  onError?: (e: any) => void;
  onLoad?: () => void;
};

const ModelViewer: React.FC<ModelViewerProps> = ({
  vrUrl,
  onLoad,
  onError,  
  className
}) => {
  // const modelRef = useRef<HTMLElement>(null);
  // useEffect(() => {
  //   const modelElement = modelRef.current;
  //   if (!modelElement) return;

  //   const handleLoad = () => {
  //     if (onLoad) onLoad();
  //   };
  //   const handleError = (e : any) => {
  //     if(onError) onError(e);
  //   };

  //   modelElement.addEventListener("load", handleLoad);
  //   modelElement.addEventListener("error", handleError);

  //   return () => {
  //     modelElement.removeEventListener("load", handleLoad);
  //     modelElement.removeEventListener("error", handleError);
  //   };
  // }, [onLoad, onError]);

  return (
    <div className={twMerge("w-full h-full", className)}>
      <model-viewer
        // ref={modelRef}
        onLoad={onLoad}
        onError={onError}
        className="w-full h-full"
        src={vrUrl}
        camera-controls
        auto-rotate
        autoPlay
        rotation-per-second="10deg"
        interaction-prompt="none"
        environment-image="null"
        // shadow-intensity="1"
        // loading={loading}
        // modelCacheSize={lowMemory ? 0 : 4}
        // ar
        // disable-zoom
      ></model-viewer>
    </div>
  );
};

export default ModelViewer;
