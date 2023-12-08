// top level function for event display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";
import { EventEntry } from "../types/types";
import {NavigationButton} from "../../NavigationButton";
import { mockEvents1 } from "../mocks/mockEvents";

export interface Events {
  events: EventEntry[];
  //setEvents: Dispatch<SetStateAction<EventEntry[]>>;
}


export default function Events({events}: Events) {
  return (
  <div className="events">
      <NavigationButton to = "/eventsAll" label = "Show All"/>
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-6">
        {mockEvents1.map((event, index) => (
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
}
