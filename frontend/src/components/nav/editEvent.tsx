import { useState } from "react";
import { EditEventButton } from "../../NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { WrappedMap } from "./WrappedMap";
import { GeoLoc } from "../types/types";
import { ControlledInput } from "./controlledInput";

export default function EditEvent() {
  const [eventLocation, setEventLocation] = useState<GeoLoc>();

  const [artistNameValue, setArtistNameValue] = useState("");
  const [artist, setArtist] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [event, setEvent] = useState("");
  const [venueValue, setVenueValue] = useState("");
  const [venue, setVenue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [date, setDate] = useState("");

  // handleSubmit function for artist
  function handleSubmitArtist(input: string) {
    setArtist(input);
    console.log("This is the artist: ", input);
    setArtistNameValue("");
  }

  // handleSubmit function for events
  function handleSubmitEvent(input: string) {
    setEvent(input);
    console.log("This is the event: ", input);
    setEventValue("");
  }

  function handleSubmitVenue(input: string) {
    setVenue(input);
    console.log("This is the venue: ", input);
    setVenueValue("");
  }

  function handleSubmitDate(input: string) {
    setDate(input);
    console.log(input);
    setDateValue("");
  }

  return (
    <div className="max-h-screen overflow-scroll">
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
          onSubmit={() => handleSubmitVenue(eventValue)}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"text"}
        />
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WrappedMap setCurrentLocation={setEventLocation}></WrappedMap>
      </div>

      <div className="mt-7">
        <p> What is the date of your event? </p>
        <ControlledInput
          value={dateValue}
          setValue={setDateValue}
          placeholder={"Input date name here"}
          ariaLabel={"Command input"}
          onSubmit={() => handleSubmitDate(eventValue)}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          text={"date"}
        />
      </div>
    </div>
  );
}

// barebones formatting for event submission.
//    const handleSubmit = (e) => {
//      e.preventDefault(); // Prevents the default form submission behavior
//      setArtistName(e.value)
//      console.log(artistName)
//    };
