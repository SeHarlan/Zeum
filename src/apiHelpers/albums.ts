import { UpdateAlbumRequestBody } from "@/pages/api/albums/updateAlbum";
import { AlbumType } from "@/types/album";
import { handleClientError } from "@/utils/handleError";
import axios from "axios";

interface AlbumsFetcherProps {
  userId?: string;
  albumName?: string;
}

export const albumsFetcher = async ({ userId, albumName }: AlbumsFetcherProps) => {
  if (!userId) return undefined;


  return axios
    .post<AlbumType | AlbumType[]>("/api/albums/getAlbums", { userId, albumName })
    .then((res) => res.data)
    .catch((err) => {
      handleClientError({
        error: err,
        location: "albumsFetcher-GetAlbum",
      });
      return undefined;
    });
}

export const createNewAlbum = async ({ name }: Partial<AlbumType>) => {
  return axios
    .post<AlbumType>(
      "/api/albums/createAlbum",
      { name },
    )
    .then((res) => res.data)
    .catch((err) => {
      handleClientError({
        error: err,
        location: "createNewAlbum",
      });
    });
}


interface UpdateAlbumReturn {
  updatedAlbum: AlbumType;
  errorAssets?: string[]; //names
}
export const updateAlbum = async (body: UpdateAlbumRequestBody) => {
  return axios
    .post<UpdateAlbumReturn>("/api/albums/updateAlbum", body)
    .then((res) => res.data)
    .catch((err) => {
      handleClientError({
        error: err,
        location: "updateAlbum",
      });
    });
};