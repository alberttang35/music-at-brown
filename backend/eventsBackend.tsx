import { getDocs, collection } from "firebase/firestore";
import {useEffect, useState} from "react";
import{db} from "./firebase";
import { EventEntry } from "../frontend/src/components/types/types";

export function eventsBackend(): EventEntry[] {
    const [events, setEvents] = useState<EventEntry[]>([]);
    const [ids, setIds] = useState<string[]>([]);


    const eventCollectionRef = collection(db, "Events");

    useEffect(() => {
        const getEvents = async () => {
            try {
            const data = await getDocs(eventCollectionRef);
            const filteredData = data.docs.map((doc) => {
                const eventData = doc.data() as EventEntry;
                return eventData;
              });
            setEvents(filteredData);
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

        getEvents();
    }, []);

    return events;
}
