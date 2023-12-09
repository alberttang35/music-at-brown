import { useState } from "react";
import { EditEventButton } from "../../NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { WrappedMap } from "./WrappedMap";
import { GeoLoc } from "../types/types";

export default function EditEvent() {
  const [eventLocation, setEventLocation] = useState<GeoLoc>();

  // barebones formatting for event submission.
  // TODO: make the UI nice for this!
  return (
    <div className="max-h-screen overflow-scroll">
      <EditEventButton to="/" label="Go To Homepage" />
      <div className="mt-10">
        <p> What is your artist name? </p>
        <input
          placeholder={"Type your artist name here"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-7">
        <p> Optionally provide an image for your event for public display </p>
        <input
          placeholder={"Provide image link"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-7">
        <p> Where are you performing? </p>
        <input
          placeholder={"Provide additional location details here"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
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
        <input
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
          type="date"
        />
      </div>
    </div>
  );
}
