import {HeliusDAS} from "@/types/helius";
import { handleServerError } from "@/utils/handleError";
import axios from "axios";

type GetAssetResponse = {
  result: HeliusDAS.GetAssetResponseList;
};

export const getAllSolanaAssets = async (publicKeys: string[]) => {
  const assets: HeliusDAS.GetAssetResponse[] = [];

  let page = 1; //starts at 1
  const maxBatch = 1000
  const heliusUrl = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

  for (const publicKey of publicKeys) {
    let page = 1 // Starts at 1
    let continueFetching = true;
    while (continueFetching) {
      const res = await axios.post<GetAssetResponse>(heliusUrl,
        {
          jsonrpc: "2.0",
          id: `zeum-${publicKey}-${page}`,
          method: "getAssetsByOwner",
          params: {
            ownerAddress: publicKey,
            page: page,
            limit: maxBatch,
            displayOptions: {
              showUnverifiedCollections: true,
              showCollectionMetadata: true,
            },
          },
        })
        .then((res) => {
          return res.data.result;
        })
        .catch((err) => {
          handleServerError({
            error: err,
            location: "getAllSolanaAssets",
          });

          return null;
        });
    
      if (!res || res.items.length == 0) {
        continueFetching = false
        break;
      } else {
        assets.push(...res.items)
        page++;
      }
    }
  }
  return assets;
}

