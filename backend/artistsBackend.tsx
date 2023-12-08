import { getDocs, collection } from "firebase/firestore";
import {useEffect, useState} from "react";
import{db} from "./firebase";

export function artistsBackend() {
    const [name, setName] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [image, setImage] = useState<string[]>([]);
    const [bio, setBio] = useState<string[]>([]);
    const [id, setId] = useState<string[]>([]);
    const artistCollectionRef = collection(db, "Artists");

    useEffect(() => {
        const getArtists = async () => {
            try {
            const data = await getDocs(artistCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
            } catch (err) {
                console.error(err);
            };
        }

        getArtists();
    }, []);
}

