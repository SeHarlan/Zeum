"use client"
import { updateAlbum } from "@/apiHelpers/albums";
import AssetSidebar from "@/components/editAlbum/AssetSidebar";
import EditAlbumItem from "@/components/editAlbum/EditAlbumItem";
import { useUser } from "@/context/UserContextProvider";
import useAlbums from "@/hooks/useAlbums";
import useDebounce from "@/hooks/useDebounce";
import { AlbumType } from "@/types/album";
import { AssetType } from "@/types/assets";
import { useCallback, useEffect, useState } from "react";

interface PageProps { 
  params: { albumName: string } 
}

function Page({ params }: PageProps) {
  const { albumName } = params;

  const { user } = useUser();
  const { data: album } = useAlbums<AlbumType>(user?._id, albumName);
  console.log("🚀 ~ Page ~ album:", album)

  const [albumAssets, setAlbumAssets] = useState<AssetType[]>([]);

  useEffect(() => {
    if (!albumAssets.length && album?.assets?.length) {
      setAlbumAssets(album.assets);
    }
  }, [album, albumAssets]);


  const debouncedUpdateAlbum = useCallback(() => {
    if (!albumAssets.length || !album) return;
    if (JSON.stringify(album.assets) === JSON.stringify(albumAssets)) return;

    console.log("Called")

    updateAlbum({
      albumId: album._id,
      updateData: {},
      assets: albumAssets,
    }).then((res) => { 
      console.log("🚀 ~ Page ~ res", res)
      //TODO mutate useAlbums with res.updatedAlbum
      //TODO: Handle errorAssets with an alert
    });
  }, [albumAssets, album]);

  useDebounce(debouncedUpdateAlbum, 15000); // Debounce the updateAlbum call for 15 seconds

  return (
    <div className="h-full grid grid-cols-3">
      <AssetSidebar setAlbumAssets={setAlbumAssets} />
      <div className="col-span-2 p-3 relative h-fit">
        <p className="text-2xl font-bold text-center">{album?.name || "..."}</p>

        <div className="grid grid-cols-3 gap-4 overflow-auto content-center items-center px-2 py-4">
          {albumAssets.map((asset) => (
            <EditAlbumItem
              key={asset.address}
              asset={asset}
              setAlbumAssets={setAlbumAssets}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;