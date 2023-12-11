import { Fragment, useState } from "react";
import { EditEventButton } from "../utilities/NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { ControlledInput } from "../utilities/controlledInput";
import { db } from "../../../../backend/firebase";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { eventsBackend } from "../../../../backend/eventsBackend";
import { Menu, Tab } from "@headlessui/react";
import { TabGroup } from "@headlessui/vue";
import { AddEvent, EditableEventHistory } from "./sideBarComponents";
import { EventEntry } from "../types/types";

export default function EditEvent() {
  // const [eventLocation, setEventLocation] = useState<GeoLoc>();

  // init params
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const { onSubmitEvent } = eventsBackend(); // imported function for submitting events to backend, on backend
  const [selectedOption, setSelectedOption] = useState("");
  const [spotifyId, setSpotifyId] = useState("nickelodekim"); // <- state for storing the spotify ID 

  // set spotify Id to what is passed in from the login page (i don't really know how to connect the classes together yet)

  // event lists
  const [eventList, setEventList] = useState<EventEntry[]>([]);
  const filteredEvents = eventsBackend().allEvents.filter(event => event.spotifyId == spotifyId)
  console.log('these are filtered events:', filteredEvents)
  console.log('this is eventList', eventList)

  // function for ADDING events to the database
  function handleAddEvent() {
    if (artist !== "" && image !== "" && venue !== "" && date !== "") {
      onSubmitEvent(artist, image, venue, date); // log to the database
      setEventList([
        ...eventList,
        {
          artist: artist,
          image: image,
          venue: venue,
          date: date,
          spotifyId: spotifyId,
        },
      ]); // add to the artist's event list with the new event
      console.log(artist, image, venue, date); // check from console
      // reset fields
      setArtist("");
      setImage("");
      setVenue("");
      setDate("");
    } else {
      // there is some field that's unfilled, don't update the database
      console.log("a field is unfilled!");
    }
  }

  // change state to selected option. changes what is displayed in the sidebar window
  function handleClick(selectedOption: string) {
    setSelectedOption(selectedOption);
  }

  // TODO: function for DELETING events from the database

  // TODO: function for EDITING the fields in an event CURRENTLY IN the database

  // partial inspiration for the menu styling credited to: https://tailwindcomponents.com/component/sidebar-by-material-tailwind
  return (
    <div className="flex flex-row">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            Event Editor
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <div
            role="button"
            className="grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            onClick={() => handleClick("addEvent")}
          >
            <div className="grid place-items-center mr-4">Add Event</div>
          </div>
          <div
            role="button"
            className="grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            onClick={() => handleClick("modifyEvent")}
          >
            <div className="grid place-items-center mr-4">Modify Event</div>
          </div>
          <div>
            <EditEventButton
              to="/"
              label="Homepage"
              className="grid place-items-center mr-3 w-full p-5 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            />
          </div>
        </nav>
      </div>
      <div className="mx-auto">
        {selectedOption == "addEvent" && (
          <AddEvent
            artist={artist}
            setArtist={setArtist}
            image={image}
            setImage={setImage}
            venue={venue}
            setVenue={setVenue}
            date={date}
            setDate={setDate}
            handleAddEvent={handleAddEvent}
            eventList={eventList}
            filteredEventList={filteredEvents}
            spotifyId={spotifyId}
          />
        )}
        {selectedOption == "modifyEvent" && (
          <EditableEventHistory
            artist={artist}
            setArtist={setArtist}
            image={image}
            setImage={setImage}
            venue={venue}
            setVenue={setVenue}
            date={date}
            setDate={setDate}
            handleAddEvent={handleAddEvent}
            eventList={eventList}
            filteredEventList={filteredEvents}
            spotifyId={spotifyId}
          />
        )}
        {selectedOption == ""}
      </div>
    </div>
  );
}
