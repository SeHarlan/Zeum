"use client"

import { useUser } from "@/context/UserContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";


import { createGenericFile, generateSigner, percentAmount, publicKey } from '@metaplex-foundation/umi'
import { create, createV1, ExternalPluginAdapterSchema, PluginAuthority, writeData } from '@metaplex-foundation/mpl-core'
import msgpack from "msgpack-lite";
import { useState } from "react";

import useUmi from "@/hooks/useUmi";
import Button from "@/components/basic/Button";
import FileDrop from "@/components/basic/FileDrop";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";

const name = "My 3rd Test HTML NFT";

function Page() {
  const { user } = useUser();
  console.log("🚀 ~ Page ~ user:", user?.username)
  const wallet = useWallet();
  const umi = useUmi()
  const [imageData, setImageData] = useState<Uint8Array | null>(null);
  const [htmlData, setHtmlData] = useState<Uint8Array | null>(null);


  const onMint = async () => { 
  
    if (!wallet.publicKey || !imageData|| !htmlData) return
    
    const imageFile = createGenericFile(imageData, "nft.png");
    const htmlFile = createGenericFile(htmlData, "nft.html");
    
    const assetSigner = generateSigner(umi);
    console.log("🚀 ~ onMint ~ assetSigner:", assetSigner.publicKey.toString())

    const dataAuthority: PluginAuthority = {
      type: "Address",
      address: publicKey(wallet.publicKey),
    };

    const [imageUri, animationUri] = await umi.uploader.upload([imageFile, htmlFile]);
    console.log("🚀 ~ onMint ~ imageUri:", imageUri)

    const uri = await umi.uploader.uploadJson({
      name,
      description: "This is my NFT",
      image: imageUri,
      animation_url: animationUri,
      properties: {
        category: "html",
        files: [
          { 
            uri: animationUri,
            type: "text/html"
          },
          { 
            uri: imageUri,
            type: "image/png"
          } 
        ]
      }
    });

    const createRes = await create(umi, {
      asset: assetSigner,
      name,
      uri,
      plugins: [
        {
          type: "AppData",
          dataAuthority,
          schema: ExternalPluginAdapterSchema.MsgPack,
        },
      ],
    }).sendAndConfirm(umi);

    console.log("🚀 ~ onMint ~ createRes:", createRes)

    const htmlMsgPackBuffer = msgpack.encode({ content: htmlData });

    const writeRes = await writeData(umi, {
      key: {
        type: "AppData",
        dataAuthority,
      },
      // authority: dataAuthority,
      data: Uint8Array.from(htmlMsgPackBuffer),
      asset: assetSigner.publicKey,
    }).sendAndConfirm(umi);

    console.log("🚀 ~ onMint ~ writeRes:", writeRes);
  }

  return (
    <div>
      <div>
        <p>html</p>
        <FileDrop onContentLoad={setHtmlData} />

        <p className="mt-10">image</p>
        <FileDrop onContentLoad={setImageData} />
      </div>
        
      <Button
        className="mt-10"
        title="Mint"
        onClick={onMint}
      />
    </div>
  )

}

export default Page;