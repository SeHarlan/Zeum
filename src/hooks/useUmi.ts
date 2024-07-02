import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const useUmi = () => {
  // Import useWallet hook
  const wallet = useWallet();
  const { connection } = useConnection()

  // Create Umi instance
  const umi = createUmi(connection.rpcEndpoint)
    .use(mplTokenMetadata())
    .use(mplCore())
    .use(irysUploader())
    .use(walletAdapterIdentity(wallet));

  return umi;
};

export default useUmi;
