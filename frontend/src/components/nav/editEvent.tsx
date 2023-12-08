import { EditEventButton } from "../../NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";


export default function EditEvent() {

   // barebones formatting for event submission. 
   // TODO: make the UI nice for this! 
  return (
    <div className="EditEvent">
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
        <p> What is the name of the venue you're performing at? </p>
        <input
          placeholder={"Provide a venue name here"}
          className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
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