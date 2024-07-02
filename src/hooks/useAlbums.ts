import { albumsFetcher } from "@/apiHelpers/albums";
import { AlbumType } from "@/types/album";
import useSWR, { KeyedMutator } from "swr";

type UseAlbumsReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: any;
  mutateAlbums: KeyedMutator<AlbumType | AlbumType[] | undefined>;
};

const useAlbums = <T extends AlbumType | AlbumType[]>(userId?: string, albumName?: string): UseAlbumsReturn<T> => {
  const { data, error, isLoading, mutate } = useSWR({ userId, albumName }, (p) =>
    albumsFetcher(p)
  );

  return {
    data: data as T | undefined,
    isLoading,
    isError: error,
    mutateAlbums: mutate,
  };
};

export default useAlbums;
