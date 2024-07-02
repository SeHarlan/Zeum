import { AssetType } from "@/types/assets";
import { handleClientError } from "@/utils/handleError";
import axios from "axios";

interface SolanaAssetFetcherProps { 
  solanaPublicKeys: string[];
}
export const solanaAssetFetcher = async ({ solanaPublicKeys}: SolanaAssetFetcherProps) => { 

  if (!solanaPublicKeys?.length) return [];

  return axios.post<AssetType[]>("/api/assets/getAssets",
    { solanaPublicKeys }
  )
    .then((res) => res.data)
    .catch((err) => {
      handleClientError({
        error: err,
        location: "solanaAssetFetcher"
      })
      return [];
    });
}

