"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";

const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Devnet;
  
  
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // const endpoint = `https://mainnet.helius-rpc.com/?api-key=${}`

  const wallets = useMemo(
    () => [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
