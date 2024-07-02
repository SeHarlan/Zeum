import connectToDatabase from "@/lib/db/mongodb";
import Album from "@/lib/models/Album";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { handleServerError } from "@/utils/handleError";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const session = await getServerSession(req, res, getAuthOptions(req));

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const name = req.body.name || `New-Album-${new Date().getTime()}`;

  try {
    const album = await Album.create({
      owner: session.user.id,
      itemIds: [],
      name,
    })
  
    res.status(200).json(album);
  } catch (error) {
    handleServerError({ error, location: "createAlbum" });
    res.status(500).json({ error: "Error creating album" });
  }
}
