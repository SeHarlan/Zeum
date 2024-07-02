import connectToDatabase, { dropIndex } from "@/lib/db/mongodb";
import Album from "@/lib/models/Album";
import Asset from "@/lib/models/Asset";
import { handleServerError } from "@/utils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const userId = req.body.userId;
  const albumName = req.body.albumName;

  if (!userId) {
    return res.status(400).json({ error: "request missing userId" });
  }

  // await dropIndex((db) =>
  //   db.collection("albums").dropIndex()
  // );
  const i = await Asset.listIndexes();
  console.log(i);
  try {
    let albums;

    if (albumName) {
      // Find a single album by name
      albums = await Album.findOne({ owner: userId, name: albumName })
        .populate("assets")
        .exec();
    } else {
      // Find all albums owned by the user
      albums = await Album.find({ owner: userId }).exec();
    }

    res.status(200).json(albums);
  } catch (error) {
    handleServerError({ error, location: "getAlbums" });
    res.status(500).json({ error: "Error finding albums" });
  }
}
