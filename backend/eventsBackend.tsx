import { getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "./firebase";
import { EventEntry } from "../frontend/src/components/types/types";
import { mockEvents1 } from "../frontend/src/components/mocks/mockEvents";

export function eventsBackend() {
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const eventCollectionRef = collection(db, "Events"); // ref to the events

  // handles event submission
  async function onSubmitEvent(
    artist1: string,
    event1: string,
    venue1: string,
    date1: string
  ) {
    try {
      await addDoc(eventCollectionRef, {
        artist: artist1,
        event: event1,
        venue: venue1,
        date: date1,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Should be able to delete items from the database 
  async function deleteEvent(indexToRemoveAt:number) {
    try {
      const data = await getDocs(eventCollectionRef); 
      const idOfEventToRemove = data.docs[indexToRemoveAt].id; 
      const eventDoc = doc(db, "Events", idOfEventToRemove);
      await deleteDoc(eventDoc);
    } catch(err) {
      console.log(err); 
    }
  }

  // Updates the events list to just whatever's in the database 
  useEffect(() => {
    const getAllDatabaseEvents = async () => {
      try {
        const data = await getDocs(eventCollectionRef);
        const filteredData = data.docs.map((doc) => {
          const eventData = doc.data() as EventEntry;
          return eventData;
        });
        setEvents(filteredData);
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
    getAllDatabaseEvents();
  }, []);

  // Combine the mockEvents and the eventsData to display into the browser
  const allEvents: EventEntry[] = [...events, ...mockEvents1];

  return { allEvents, events, onSubmitEvent, deleteEvent };
}



//   const getEventsById = async(id:string) => {
//     // retrieve the events collection
//     const data = await getDocs(eventCollectionRef);
//     const filteredEventsForId = data.docs.map((doc) => ({
//         ...doc.data().spotifyId === id ? doc.data() : undefined})
//     )
//   }