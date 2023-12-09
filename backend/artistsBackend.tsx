import { getDocs, collection } from "firebase/firestore";
import {useEffect, useState} from "react";
import{db} from "./firebase";
import{Artist} from "../frontend/src/components/types/types";

export function artistsBackend(): Artist[] {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [ids, setIds] = useState<string[]>([]);

    const artistCollectionRef = collection(db, "Artists");

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
                ...doc.data().spotifyId
            }));
            console.log(idData);
            setIds(idData);
              
            } catch (err) {
                console.error(err);
            };
        }

        getArtists();
    }, []);

    return artists;

}

