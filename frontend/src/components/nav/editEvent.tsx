import { useState } from "react";
import { EditEventButton } from "../../NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { ControlledInput } from "./controlledInput";
import{db} from "../../../../backend/firebase";
import{addDoc, collection, getDoc} from "firebase/firestore"
import { eventsBackend } from "../../../../backend/eventsBackend";


export default function EditEvent() {

  const eventCollectionRef = collection(db, "Events");

  const [artistNameValue, setArtistNameValue] = useState("");
  const [artist, setArtist] = useState(""); 
  const [eventValue, setEventValue] = useState("");
  const [event, setEvent] = useState(""); 
  const [venueValue, setVenueValue] = useState("");
  const [venue, setVenue] = useState(""); 
  const [dateValue, setDateValue] = useState(""); 
  const [date, setDate] = useState("");
  const {onSubmitEvent} = eventsBackend(); // Adjust as needed



  function handleAddEvent() {
    // Call onSubmitEvent with the required parameters
    if (artist !== '' && event !== '' && venue !== '' && date !== '') {
      onSubmitEvent(artist, event, venue, date);
      setArtist('');
      setEvent('');
      setVenue('');
      setDate('');
    }
    else {
      console.log("test")
    }
    
  }

  // handleSubmit function for artist 
  function handleSubmitArtist(input: string) {
    setArtist(input);    
    setArtistNameValue(''); 
  }

  // handleSubmit function for events 
  function handleSubmitEvent(input: string) {
    setEvent(input); 
    setEventValue("");
  }

  function handleSubmitVenue(input: string) {
    setVenue(input); 
    setVenueValue(""); 
  }

   function handleSubmitDate(input: string) {
    setDate(input);
    setDateValue("");
   }    



  return (
    <div className="EditEvent">
      <EditEventButton to="/" label="Go To Homepage" />
      <div className="mt-10">
        <p> What is your artist name? </p>
        <ControlledInput
          value={artistNameValue}
          setValue={setArtistNameValue}
          placeholder={"Input artist name here"}
          ariaLabel={"Command input"}
          onSubmit={() => handleSubmitArtist(artistNameValue)}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"text"}
        />
      </div>
      <div className="mt-7">
        <p> Optionally provide an image for your event for public display </p>
        <ControlledInput
          value={eventValue}
          setValue={setEventValue}
          placeholder={"Input event name here"}
          ariaLabel={"Command input"}
          onSubmit={() => handleSubmitEvent(eventValue)}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"text"}
        />
      </div>
      <div className="mt-7">
        <p> What is the name of the venue you're performing at? </p>
        <ControlledInput
          value={venueValue}
          setValue={setVenueValue}
          placeholder={"Input venue name here"}
          ariaLabel={"Command input"}
          onSubmit={() => handleSubmitVenue(venueValue)}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"text"}
        />
      </div>
      <div className="mt-7">
        <p> What is the date of your event? </p>
        <ControlledInput
          value={dateValue}
          setValue={setDateValue}
          placeholder={"Input date name here"}
          ariaLabel={"Command input"}
          onSubmit={() => handleSubmitDate(dateValue)}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"date"}
        />
      </div>
      <button
        onClick={handleAddEvent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Event
      </button>
    </div>
  );
}

// barebones formatting for event submission. 
//    const handleSubmit = (e) => {
//      e.preventDefault(); // Prevents the default form submission behavior
//      setArtistName(e.value)
//      console.log(artistName)
//    };
