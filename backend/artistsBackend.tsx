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
    const toAdd: Artist = {
      name: name,
      genres: genres,
      image: image,
      bio: bio,
      spotifyId: spotifyId,
    };
    setArtists([...artists, toAdd]);
    try {
      await addDoc(artistCollectionRef, toAdd);
    } catch (err) {
      console.log(err);
    }
  }

  // should be able to store the current ID in the backend
  function onSubmitSpotifyID(spotifyId: string) {
    setSpotifyId(spotifyId); // all this does is literally just store the spotifyID nowhere, just sets it
    return spotifyId;
  }

  async function getArtists() {
    try {
      const data = await getDocs(artistCollectionRef);
      const filteredData = data.docs.map((doc) => {
        const artistData = doc.data() as Artist;
        return artistData;
      });
      console.log(filteredData);
      setArtists(filteredData);
      const idData = data.docs.map((doc) => ({
        ...doc.data().spotifyId,
      }));
      setIds(idData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log("backend useEffect");
    getArtists().then(() => console.log(artists));
    // console.log(artists); // appears that artists is empty even though filteredData (line 46) isnt
  }, [spotifyId]); // should only do this after an artist is added

  return { artists, onSubmitArtist, onSubmitSpotifyID, getArtists, spotifyId };
}
