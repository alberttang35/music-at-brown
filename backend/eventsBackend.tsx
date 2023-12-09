import { getDocs, collection, addDoc } from "firebase/firestore";
import {useEffect, useState} from "react";
import{db} from "./firebase";
import { EventEntry } from "../frontend/src/components/types/types";

export function eventsBackend() {
    const [events, setEvents] = useState<EventEntry[]>([]);
    const [ids, setIds] = useState<string[]>([]);


    const eventCollectionRef = collection(db, "Events");

    async function onSubmitEvent(artist1: string, event1: string, venue1: string, date1: string) {
        try {
            await addDoc(eventCollectionRef, { 
                artist: artist1, 
                event: event1,
                venue: venue1, 
                date: date1 });
        } catch (err) {
            console.log(err)
        }
       
    }
    
   

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

    return { events, onSubmitEvent };
}



