import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { EventEntry } from "../frontend/src/components/types/types";
import { mockEvents1 } from "../frontend/src/components/mocks/mockEvents";

export function eventsBackend() {
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const eventCollectionRef = collection(db, "Events"); // ref to the events
  const artistCollectionRef = collection(db, "Artists");

  // handles event submission
  async function onSubmitEvent(
    artist1: string,
    event1: string,
    venue1: string,
    date1: string
  ): Promise<string> {
    try {
      // Query the Artists collection to get the spotifyId for the given artist1
      const artistQuery = query(
        collection(db, "Artists"),
        where("name", "==", artist1)
      );
      const artistSnapshot = await getDocs(artistQuery);

      let spotifyId = ""; // Default value in case artist is not found
      artistSnapshot.forEach((doc) => {
        const artistData = doc.data();
        if (artistData.spotifyId) {
          spotifyId = artistData.spotifyId;
        }
      });

      // Add the event to the Events collection with the obtained spotifyId
      await addDoc(collection(db, "Events"), {
        artist: artist1,
        event: event1,
        venue: venue1,
        date: date1,
        spotifyId: spotifyId,
      });

      // Return the spotifyId
      return spotifyId;
    } catch (err) {
      console.log(err);
      // Return an appropriate value in case of an error (e.g., an empty string)
      return "";
    }
  }

  // Should be able to delete items from the database
  async function deleteEvent(
    eventImage: string,
    eventArtist: string,
    eventVenue: string
  ) {
    try {
      const data = await getDocs(eventCollectionRef);
      const idData = data.docs.filter(
        (doc) =>
          doc.data().venue === eventVenue &&
          doc.data().image === eventImage &&
          doc.data().artist === eventArtist
      );
      // console.log(eventImage, eventArtist, eventVenue);
      // console.log("id data...", idData);
      if (idData.length == 1) {
        console.log("deleting event...");
        const eventDoc = doc(db, "Events", idData[0].id);
        await deleteDoc(eventDoc);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function editEvent(
    spotifyId: string,
    fieldToChange: string,
    fieldValue: string
  ) {
    try {
      const eventDocRef = doc(eventCollectionRef, spotifyId);
      const eventDocSnapshot = await getDoc(eventDocRef);

      if (eventDocSnapshot.exists()) {
        const currentEventData = eventDocSnapshot.data();
        if (currentEventData.hasOwnProperty(fieldToChange)) {
          // Only update if the field exists in the current event data
          await updateDoc(eventDocRef, {
            [fieldToChange]: fieldValue,
          });
          console.log("Event edited successfully.");
        } else {
          console.log(
            `Field '${fieldToChange}' does not exist in the event document.`
          );
        }
      } else {
        console.log(`Event with spotifyId '${spotifyId}' does not exist.`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getEvents() {}

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
        const idData = data.docs.map((doc) => ({
          ...doc.data().spotifyId,
        }));
        setIds(idData);
      } catch (err) {
        console.error(err);
      }
    };
    getAllDatabaseEvents();
  }, []); // need a dependency, otherwise i dont think its updating when it should

  // Combine the mockEvents and the eventsData to display into the browser
  const allEvents: EventEntry[] = [...events, ...mockEvents1];
  // console.log("all events: ");
  // console.log(allEvents);

  return { allEvents, events, onSubmitEvent, deleteEvent, editEvent };
}
