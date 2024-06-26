import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { Artist } from "../frontend/src/components/types/types";
import { ArtistEntry } from "../frontend/src/components/types/ArtistEntry";

export function artistsBackend() {
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
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
    setAllArtists([...allArtists, toAdd]);
    try {
      await addDoc(artistCollectionRef, toAdd);
    } catch (err) {
      console.log(err);
    }
  }

  async function getArtists() {
    try {
      const data = await getDocs(artistCollectionRef);
      const filteredData = data.docs.map((doc) => {
        const artistData = doc.data() as Artist;
        return artistData;
      });
      console.log(filteredData);
      setAllArtists(filteredData);
      const idData = data.docs.map((doc) => ({
        ...doc.data().spotifyId,
      }));
      setIds(idData);
    } catch (err) {
      console.error(err);
    }
  }

  async function editArtist(
    spotifyId: string,
    fieldToChange: string,
    fieldValue: string
  ) {
    try {
      const artistDocRef = doc(artistCollectionRef, spotifyId);
      const artistDocSnapshot = await getDoc(artistDocRef);

      if (artistDocSnapshot.exists()) {
        const currentArtistData = artistDocSnapshot.data();
        if (currentArtistData.hasOwnProperty(fieldToChange)) {
          // Only update if the field exists in the current artist data
          await updateDoc(artistDocRef, {
            [fieldToChange]: fieldValue,
          });
          console.log("Artist edited successfully.");
        } else {
          console.log(
            `Field '${fieldToChange}' does not exist in the artist document.`
          );
        }
      } else {
        console.log(`Artist with spotifyId '${spotifyId}' does not exist.`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("backend useEffect");
    getArtists();
    // console.log(artists); // appears that artists is empty even though filteredData (line 46) isnt
  }, [spotifyId]); // should only do this after an artist is added

  return { allArtists, onSubmitArtist, getArtists, spotifyId };
}
