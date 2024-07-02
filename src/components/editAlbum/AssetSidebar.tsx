"use client"

import { useUser } from "@/context/UserContextProvider";
import useSolanaAssets from "@/hooks/useSolanaAssets";
import { ChainIdsEnum } from "@/types/wallet";
import { useMemo, useState } from "react";
import DisplayAssetMedia from "../media/DisplayAsset";
import Pagination from "../basic/Paginations";
import { AssetType } from "@/types/assets";

interface AssetSidebarProps {
  setAlbumAssets: React.Dispatch<React.SetStateAction<AssetType[]>>;
}

const AssetSidebar: React.FC<AssetSidebarProps> = ({setAlbumAssets}) => {

  const { user } = useUser();
  //arrange all a users address by blockchain
  const { solanaPublicKeys } = useMemo(() => {
    if (!user?.wallets) return { solanaPublicKeys: [] };
    const solanaPublicKeys: string[] = [];

    user.wallets.forEach((wallet) => {
      switch (wallet.type) {
        case ChainIdsEnum.SOLANA:
          solanaPublicKeys.push(wallet.address);
          break;
        default:
          break;
      }
    });
    return { solanaPublicKeys };
  }, [user?.wallets]);

  const { solanaAssets } = useSolanaAssets(solanaPublicKeys);

  const [page, setPage] = useState(0);
  const perPage = 15;
  const totalItems = solanaAssets?.length || perPage * 5;
  const start = page * perPage;
  const end = start + perPage;
  const assets = solanaAssets?.slice(start, end);

  return (
    <div className="h-screen w-full sticky top-0 border-2 border-l-0 border-stone-400 rounded-r-lg bg-stone-100 shadow">
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-2 h-full overflow-auto content-start p-2 pb-14">
        {assets?.map((asset) => (
          <button
            key={asset.address}
            className="w-full pb-[100%] relative"
            onClick={() => setAlbumAssets((prev) => [...prev, asset])}
          >
            <DisplayAssetMedia
              asset={asset}
              className="w-full h-full rounded-md overflow-hidden absolute inset-0 bg-stone-300 shadow hover:shadow-lg duration-300"
              onlyImage
            />
          </button>
        ))}
      </div>

      <div className="h-12 py-2 absolute bottom-0 left-0 right-0 bg-stone-400/75 backdrop-blur">
        <Pagination page={page} setPage={setPage} totalItems={totalItems} perPage={perPage}/>
      </div>
    </div>
  );
}

export default AssetSidebar;