// top level function for event display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";
import { EventEntry } from "./types";
import NavigationButton from "./NavigationButton";

export interface Events {
  events: EventEntry[];
  setEvents: Dispatch<SetStateAction<EventEntry[]>>;
}

export default function Events({ events }: Events) {
  <div className="events">
    <NavigationButton to="/eventsAll" />
    <ul className="divide-y divide-gray-200">
      {events.map((event, index) => (
        <div key={index}>
          {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
          <li key={index} className="py-4 flex">
            <img className="h-10 w-10 rounded-full" src={event.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {event.artist}
              </p>
              <p className="text-sm font-medium text-gray-900">{event.venue}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </li>
        </div>
      ))}
    </ul>
  </div>;
}
