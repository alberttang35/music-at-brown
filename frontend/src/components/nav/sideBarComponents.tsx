import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../utilities/controlledInput";
import { EventEntry } from "../types/types";
import { eventsBackend } from "../../../../backend/eventsBackend";

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
  fieldToChange: string;
  setFieldToChange: Dispatch<SetStateAction<string>>;
  fieldValue: string;
  setFieldValue: Dispatch<SetStateAction<string>>;
  handleAddEvent: () => void;
  eventList: EventEntry[];
  filteredEventList: EventEntry[]; 
  spotifyId: string;
  setSpotifyId: Dispatch<SetStateAction<string>>;
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
export function EditableEventHistory({ eventList, spotifyId, filteredEventList,
  fieldToChange,
  setFieldToChange,
  fieldValue,
  setFieldValue}: SideBarComponents) {
  console.log(spotifyId);

  // map through the list of events you have, checking to see if the artist's spotify ID matches
  // const filteredEventsForId = eventList.filter(event => event.spotifyId === spotifyId)
  const [eventsToDisplay, setEventsToDisplay] = useState([
    ...eventList,
    ...filteredEventList,
  ]);
  const { deleteEvent } = eventsBackend(); // imported function for submitting events to backend, on backend

  const { editEvent } = eventsBackend();

  console.log("these are filtered events by id", eventsToDisplay);

  // delete the item
  const deleteItem = (index:number, eventImage: string, eventArtist:string, eventVenue:string) => {
    console.log('im deleting an event right now...')
    deleteEvent(eventImage, eventArtist, eventVenue); // call to the backend 
    // update for display on the frontend
    const updatedList = [
      ...eventsToDisplay.slice(0, index),
      ...eventsToDisplay.slice(index + 1),
    ]; // everything before and after the index
    setEventsToDisplay(updatedList);
  };

  const editItem = async (index: number, fieldToChange: string, fieldValue: string) => {
    console.log('Editing an event right now...');
  
    // Call the backend to update the event
    await editEvent(eventsToDisplay[index].spotifyId, fieldToChange, fieldValue);
  
    // Update the display on the frontend
    const updatedList = [...eventsToDisplay];
    updatedList[index] = {
      ...updatedList[index],
      [fieldToChange]: fieldValue,
    };
  
    setEventsToDisplay(updatedList);
  };


  // map through the list of events added, then display them in REPL format in a side window.
  return (
    <div className="modifyEvent">
      <ul className="divide-x divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-3 max-h-96">
        {eventsToDisplay.map((event, index) => (
          <div key={index} className="mb-8"> {/* Adjust margin-bottom to control spacing */}
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="h-56 w-45 shadow-xl rounded-xl">
              <img
                className="aspect-video w-45 object-cover object-center rounded-t-xl"
                src={event.image}
                alt=""
              />
              <div className="grid place-items-center ml-3 h-10 w-45">
                <p className="text-sm font-medium text-gray-900">
                  {event.artist}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {event.venue}
                </p>
                <p className="text-sm text-gray-500">{event.date}</p>
                <div className="mt-10">
                  <p> What field would you like to change? </p>
                    <ControlledInput
                      value={fieldToChange}
                      setValue={setFieldToChange}
                      placeholder={"Input field type"}
                      ariaLabel={"Command input"}
                      className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
                      text={"text"}
                  />
                </div>
                <div className="mt-10">
                  <p> Please input the new value for the field </p>
                    <ControlledInput
                      value={fieldValue}
                      setValue={setFieldValue}
                      placeholder={"Input field value"}
                      ariaLabel={"Command input"}
                      className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
                      text={"text"}
                  />
                </div>
                <button
                  className={
                    "grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                  }
                  onClick={() => editItem(index, fieldToChange, fieldValue)}
                >
                  Edit Event
                </button>
                <button
                  className={
                    "grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                  }
                  onClick={() => deleteItem(index, event.image, event.artist, event.venue)}
                >
                  Delete Event
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
  
  // IDEA: should have a popup for "are you sure you want to delete this event?"
}

// ?function for deleting events
export function DeleteEvent() {}
