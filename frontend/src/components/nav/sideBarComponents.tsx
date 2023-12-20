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
          className="mt-2 border rounded-md p-2 focus:outline-none focus:border-blue-500"
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
          className="mt-2 border rounded-md p-2 focus:outline-none focus:border-blue-500"
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
          className="mt-2 border rounded-md p-2 focus:outline-none focus:border-blue-500"
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
          className="mt-2 border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"date"}
        />
      </div>
      <div className="mt-7">
        <button
          onClick={handleAddEvent}
          className="mt-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <div className="grid place-items-center">Add Event</div>
        </button>
      </div>
    </div>
  );
}

// display for editing an event
export function EditableEventHistory({
  eventList,
  spotifyId,
  filteredEventList,
  fieldToChange,
  setFieldToChange,
  fieldValue,
  setFieldValue,
}: SideBarComponents) {
  console.log(spotifyId);

  const [popUp, setPopUp] = useState(-1); // manage whether popup should be shown or not  
  console.log(popUp)

  const [eventsToDisplay, setEventsToDisplay] = useState([
    ...eventList,
    ...filteredEventList,
  ]);
  const { deleteEvent } = eventsBackend(); // imported function for submitting events to backend, on backend

  const { editEvent } = eventsBackend();

  console.log("these are filtered events by id", eventsToDisplay);

  // delete the item
  const deleteItem = (
    index: number,
    eventImage: string,
    eventArtist: string,
    eventVenue: string
  ) => {
    console.log("im deleting an event right now...");
    deleteEvent(eventImage, eventArtist, eventVenue); // call to the backend
    // update for display on the frontend
    const updatedList = [
      ...eventsToDisplay.slice(0, index),
      ...eventsToDisplay.slice(index + 1),
    ]; // everything before and after the index
    setEventsToDisplay(updatedList);
  };

  const editItem = async (
    index: number,
    fieldToChange: string,
    fieldValue: string
  ) => {
    console.log("Editing an event right now...");

    // Call the backend to update the event
    await editEvent(
      eventsToDisplay[index].spotifyId,
      fieldToChange,
      fieldValue
    );

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
      <ul className="divide-x divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-3">
        {eventsToDisplay.map((event, index) => (
          <div key={index} className="mb-8">
            {" "}
            {/* Adjust margin-bottom to control spacing */}
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="h-60 w-45 shadow-xl rounded-xl">
              <img
                className="aspect-video w-45 object-cover object-center rounded-t-xl"
                src={event.image}
                alt=""
              />
              <div className="grid place-items-center ml-3 h-10 w-45">
                <p className="text-sm font-medium text-gray-900">
                  {"artist: " + event.artist}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {"venue: " + event.venue}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {"date: " + event.date}
                </p>
                <button
                  className={
                    "mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }
                  onClick={() =>
                    deleteItem(index, event.image, event.artist, event.venue)
                  }
                >
                  Delete Event
                </button>
                {/* The below code controls the popup for editing events */}
                <button
                  className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setPopUp(index)}
                >
                  Open Editor
                </button>
              </div>
            </li>
            {popUp == index && (
              <div className="mt-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="mt-10">
                  <p className="text-sm">
                    {" "}
                    What field would you like to change?{" "}
                  </p>
                  <ControlledInput
                    value={fieldToChange}
                    setValue={setFieldToChange}
                    placeholder={"Input field type"}
                    ariaLabel={"Command input"}
                    className="mt-3 w-40 h-8 p-2 rounded-md border focus:outline-none focus:border-blue-500 w-45"
                    text={"text"}
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm">
                    {" "}
                    Please input the new value for the field{" "}
                  </p>
                  <ControlledInput
                    value={fieldValue}
                    setValue={setFieldValue}
                    placeholder={"Input field value"}
                    ariaLabel={"Command input"}
                    className="mt-3 w-40 h-8 p-2 rounded-md border focus:outline-none focus:border-blue-500"
                    text={"text"}
                  />
                </div>
                <button
                  className={
                    "mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }
                  onClick={() => editItem(index, fieldToChange, fieldValue)}
                >
                  Submit Edits
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
