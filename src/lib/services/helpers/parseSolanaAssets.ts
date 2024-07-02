import { AssetType, AssetCategory, SolanaTokenTypes } from "@/types/assets";
import { HeliusDAS } from "@/types/helius";
import { ChainIdsEnum } from "@/types/wallet";

export const parseSolanaAssets = (rawAssets: HeliusDAS.GetAssetResponse[]): AssetType[] => {
  const parsedAssets: AssetType[] = [];



  for (const asset of rawAssets) {
    const { content, creators, ownership, id, grouping, compression, supply, royalty } = asset
    if (!content || !content.files || !content.links || !content.metadata) continue;
    
    const imageUrl = content.links?.image;
    if (!imageUrl) continue;
    
    if (!creators?.length) continue;
    
    const collectionInfo = (grouping?.length && grouping[0].collection_metadata)
      ? {
        ...grouping[0].collection_metadata,
        verified: grouping[0].verified,
      }
      : undefined;
    
    const attributes = content.metadata.attributes?.length
      ? content.metadata.attributes?.map((a) => ({
          traitType: a.trait_type,
          value: a.value,
        }))
      : undefined



    //Figure out token type
    const isEdition = supply?.edition_number !== undefined
    const isMasterEdition = supply?.print_max_supply && supply?.edition_number === undefined;
    const isCompressed = compression?.compressed;

    let tokenType = SolanaTokenTypes.Single;

    if (isEdition) {
      tokenType = SolanaTokenTypes.Edition;
    } else if (isMasterEdition) {
      tokenType = SolanaTokenTypes.MasterEdition;
    } else if (isCompressed) {
      tokenType = SolanaTokenTypes.Compressed;
    } 

    //parse media and figure out category
    const { imageCdnUrl, videoUrl, htmlUrl, vrUrl } = parseSolanaMedia({
      files: content.files,
      animationUrl: content.links.animation_url
    });

    let category: AssetCategory = AssetCategory.Image;
    if (videoUrl) category = AssetCategory.Video;
    if (htmlUrl) category = AssetCategory.Html;
    if (vrUrl) category = AssetCategory.Vr;




    const parsedAsset: AssetType = {
      name: content.metadata.name,
      blockchain: ChainIdsEnum.SOLANA,
      address: id,
      description: content.metadata.description,
      creators,
      tokenType,
      collectionInfo,
      ownerAddress: ownership.owner,
      attributes,
      category,
      media: {
        imageUrl,
        imageCdnUrl,
        videoUrl,
        htmlUrl,
        vrUrl,
      },
    };

    parsedAssets.push(parsedAsset);
  }


  return parsedAssets;
};  

type ParseSolanaMediaProps = {
  files: HeliusDAS.File[];
  animationUrl?: string;
}

export const parseSolanaMedia = ({ files, animationUrl }: ParseSolanaMediaProps) => {

  let imageCdnUrl: string | undefined;
  let videoUrl: string | undefined;
  let htmlUrl: string | undefined;
  let vrUrl: string | undefined;

  for (const file of files) {
    if (file.mime?.includes("image")) {
      imageCdnUrl = file.cdn_uri;
    } else if (file.mime?.includes("video")) {
      if (file.uri === animationUrl) { //make sure its the primary video file
        videoUrl = animationUrl;
      }
    } else if (file.mime?.includes("html")) {
      htmlUrl = file.uri;
    } else if (file.mime?.includes("model")) {
      vrUrl = file.uri;
    }

  }

  return {
    imageCdnUrl,
    videoUrl,
    htmlUrl,
    vrUrl,
  }
}
