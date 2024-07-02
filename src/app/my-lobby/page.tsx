"use client"
import { createNewAlbum } from "@/apiHelpers/albums";
import { useUser } from "@/context/UserContextProvider"
import useAlbums from "@/hooks/useAlbums";
import { AlbumType } from "@/types/album";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { user } = useUser();
  const { data: albums } = useAlbums<AlbumType[]>(user?._id)
  const router = useRouter();
  const { data: session } = useSession();
  
  useEffect(() => {
    if (!user || !session) return;
    if (albums && !albums?.length) {
      createNewAlbum({ name: "My-First-Album" })
        .then((album) => {
          if (album) {
            router.push(`/lobby/${album.name}`);
          }
        })
    }
  }, [user, albums, router, session])


  return (
    <div className="h-screen flex justify-center items-center">
     

      {albums?.length ? (
        <div className="flex flex-col">
          {albums.map((album) => ( 
            <Link
              key={album._id}
              href={`/my-lobby/${album.name}`}
              className="text-lg font-bold underline"
            >
              {album.name}
            </Link>
          ) )}
        </div>
      ): null}
     
    </div>
  );
}

export default Page;