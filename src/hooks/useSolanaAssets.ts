import { solanaAssetFetcher } from "@/apiHelpers/assets";
import useSWR from "swr";

const useSolanaAssets = (solanaPublicKeys: string[]) => { 
  const { data, error, isLoading, mutate } = useSWR(
    { solanaPublicKeys },
    (p) => solanaAssetFetcher(p)
  );

  return {
    solanaAssets: data,
    isLoading,
    isError: error,
    mutateSolanaAssets: mutate,
  };
}

export default useSolanaAssets;