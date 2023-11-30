// top level function for event display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";
import { Event } from "./types";

export interface Events {
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
}

export default function Events() {
  return <div>
    <h1>Events</h1>
    
  </div>;
}
