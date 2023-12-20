import { getDocs, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { Artist } from "../frontend/src/components/types/types";

export function artistsBackend() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [spotifyId, setSpotifyId] = useState(""); 
  const artistCollectionRef = collection(db, "Artists");

  async function onSubmitArtist(
    name: string,
    genres: string[],
    image: string,
    bio: string,
    spotifyId: string
  ) {
    try {
      await addDoc(artistCollectionRef, {
        name: name,
        image: image,
        bio: bio,
        spotifyId: spotifyId,
        genres: genres,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // should be able to store the current ID in the backend
  function onSubmitSpotifyID(spotifyId: string) {
    setSpotifyId(spotifyId); // all this does is literally just store the spotifyID nowhere, just sets it 
    return spotifyId; 
  }

  useEffect(() => {
    const getArtists = async () => {
      try {
        const data = await getDocs(artistCollectionRef);
        const filteredData = data.docs.map((doc) => {
          const artistData = doc.data() as Artist;
          return artistData;
        });
        setArtists(filteredData);
        console.log(filteredData);
        const idData = data.docs.map((doc) => ({
          ...doc.data().spotifyId,
        }));
        console.log(idData);
        setIds(idData);
      } catch (err) {
        console.error(err);
      }
    };

    getArtists();
  }, []);

  return { artists, onSubmitArtist, onSubmitSpotifyID, spotifyId};
}
