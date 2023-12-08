import { getDocs, collection } from "firebase/firestore";
import {useEffect, useState} from "react";
import{db} from "./firebase";

export function eventsBackend() {
    const [name, setName] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [image, setImage] = useState<string[]>([]);
    const [bio, setBio] = useState<string[]>([]);
    const [id, setId] = useState<string[]>([]);
    const eventCollectionRef = collection(db, "Events");

    useEffect(() => {
        const getEvents = async () => {
            try {
            const data = await getDocs(eventCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
            } catch (err) {
                console.error(err);
            };
        }

        getEvents();
    }, []);
}
