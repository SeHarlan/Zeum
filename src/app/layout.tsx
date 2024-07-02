import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import WalletContextProvider from "@/context/WalletContextProvider";

import "./globals.css";
import UserContextProvider from "@/context/UserContextProvider";
import SessionProvider from "@/context/AuthSessionProvider";
require("@solana/wallet-adapter-react-ui/styles.css");
require("./globals.css");

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeum",
  description: "Bringing digital art to the home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider> 
          <SessionProvider refetchInterval={0}>
            <UserContextProvider>
              <nav className="flex items-center justify-between h-16 fixed top-0 "></nav>

              <main className="min-h-screen relative">{children}</main>

              <footer className="flex items-center justify-between p-8">
                footer stuff
              </footer>
            </UserContextProvider>
          </SessionProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
