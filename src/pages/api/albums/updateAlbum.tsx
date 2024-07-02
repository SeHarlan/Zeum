import connectToDatabase from "@/lib/db/mongodb";
import Album from "@/lib/models/Album";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { handleServerError } from "@/utils/handleError";
import { AlbumType } from "@/types/album";
import Asset from "@/lib/models/Asset";
import { AssetType } from "@/types/assets";


export interface UpdateAlbumRequestBody {
  albumId: string;
  updateData: Partial<AlbumType>;
  assets?: AssetType[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const session = await getServerSession(req, res, getAuthOptions(req));

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const errorAssets: string[] = [];
  const successAssets: string[] = [];
  
  try {
    const { albumId, updateData, assets } = req.body as UpdateAlbumRequestBody;
    
      if (assets?.length) {
      // Batch existence check
      const existingAssets = await Asset.find({
        address: { $in: assets.map(asset => asset.address) }
      }, { address: 1 });

      const existingAddresses = existingAssets.map(asset => asset.address);

      // Separate new assets from existing ones
      const newAssets = assets.filter(asset => !existingAddresses.includes(asset.address));
      const existingAssetsInRequest = assets.filter(asset => existingAddresses.includes(asset.address));

      // Add existing assets to successAssets
      successAssets.push(...existingAssetsInRequest.map(asset => asset.address));

      // Batch create new assets
      if (newAssets.length) {
        try {
          const createdAssets = await Asset.insertMany(newAssets);
          successAssets.push(...createdAssets.map(asset => asset.address));
        } catch (e) {
          errorAssets.push(...newAssets.map(asset => asset.name));
          handleServerError({
            error: e,
            location: "updateAlbum-createAssets"
          });
        }
      }

      // Update updateData to only include assets that are in the database
      updateData.assetAddresses = successAssets;
    }

    // Find and update the album by ID
    const updatedAlbum = await Album.findOneAndUpdate(
      { _id: albumId, owner: session.user.id }, // Ensure the owner matches
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document
    ).exec();

    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found", errorAssets  });
    }

    res.status(200).json({ updatedAlbum, errorAssets });
  } catch (error) {
    handleServerError({ error, location: "updateAlbum" });
    res.status(500).json({ error: "Error updating album", errorAssets });
  }
}
