import { AssetType } from "@/types/assets";
import IconButton from "../basic/IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DisplayAssetMedia from "../media/DisplayAsset";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface EditAlbumItemProps { 
  asset: AssetType;
  setAlbumAssets: React.Dispatch<React.SetStateAction<AssetType[]>>;
}

const EditAlbumItem: React.FC<EditAlbumItemProps> = ({ asset, setAlbumAssets }) => {
  const [isLandscape, setIsLandscape] = useState(false)
  
  const handleImageLoad = (e: HTMLImageElement) => { 
    if(e.naturalWidth > e.naturalHeight) setIsLandscape(true)
  }
  return (
    <div className={twMerge("relative rounded-md overflow-hidden shadow", isLandscape && "col-span-2")}>
      <IconButton
        onClick={() =>
          setAlbumAssets((prev) =>
            prev.filter((a) => a.address !== asset.address)
          )
        }
        className="absolute top-1 right-1 z-10"
      >
        <XMarkIcon className="w-5 h-5 stroke-2" />
      </IconButton>
      <DisplayAssetMedia asset={asset} onImageLoad={handleImageLoad}/>
    </div>
  );
} 

export default EditAlbumItem;