import { Dispatch, SetStateAction } from "react";
import { ControlledInput } from "../utilities/controlledInput";
import { EventEntry } from "../types/types";

// necessary params for sidebar display
export interface SideBarComponents {
  artist: string;
  setArtist: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  venue: string;
  setVenue: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  handleAddEvent: () => void;
  eventList: EventEntry[];
  filteredEventList: EventEntry[]; 
  spotifyId: string;
}

// display for adding an event
export function AddEvent({
  artist,
  setArtist,
  image,
  setImage,
  venue,
  setVenue,
  date,
  setDate,
  handleAddEvent,
}: SideBarComponents) {
  return (
    <div className="EditEvent">
      <div className="mt-10">
        <p> What is your artist name? </p>
        <ControlledInput
          value={artist}
          setValue={setArtist}
          placeholder={"Input artist name here"}
          ariaLabel={"Command input"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"text"}
        />
      </div>
      <div className="mt-7">
        <p> Optionally provide an image for your event for public display </p>
        <ControlledInput
          value={image}
          setValue={setImage}
          placeholder={"Input event name here"}
          ariaLabel={"Command input"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"text"}
        />
      </div>
      <div className="mt-7">
        <p> What is the name of the venue you're performing at? </p>
        <ControlledInput
          value={venue}
          setValue={setVenue}
          placeholder={"Input venue name here"}
          ariaLabel={"Command input"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"text"}
        />
      </div>
      <div className="mt-7">
        <p> What is the date of your event? </p>
        <ControlledInput
          value={date}
          setValue={setDate}
          placeholder={"Input date name here"}
          ariaLabel={"Command input"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"date"}
        />
      </div>
      <div className="mt-10">
        <button
          onClick={handleAddEvent}
          className=" bottom-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <div className="grid place-items-center">Add Event</div>
        </button>
      </div>
    </div>
  );
}

// display for editing an event
export function EditableEventHistory({ eventList, spotifyId, filteredEventList}: SideBarComponents) {
  console.log(spotifyId)

  // map through the list of events you have, checking to see if the artist's spotify ID matches
  // const filteredEventsForId = eventList.filter(event => event.spotifyId === spotifyId)
  const eventsToDisplay: EventEntry[] = [...eventList, ...filteredEventList]

  console.log("these are filtered events by id", eventsToDisplay);

  // map through the list of events added, then display them in REPL format in a side window.
  return (
    <div className="SideBarEventDispaly">
      <ul className="divide-x divide-gray-200 p-10 mx-auto flex flex-row">
        {eventsToDisplay.map((event, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="h-60 w-45 shadow-xl rounded-xl">
              <img
                className="aspect-video w-45 object-cover object-center rounded-t-xl"
                src={event.image}
                alt=""
              />
              <div className="ml-3 h-10 w-45">
                <p className="text-sm font-medium text-gray-900">
                  {event.artist}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {event.venue}
                </p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );

  // should have a popup for "are you sure you want to delete this event?"
}

// ?function for deleting events
export function DeleteEvent() {}
