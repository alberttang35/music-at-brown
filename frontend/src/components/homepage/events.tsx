// top level function for event display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";
import { EventEntry } from "../types/types";
import { NavigationButton } from "../utilities/NavigationButton";
import { mockEvents1 } from "../mocks/mockEvents";
import { eventsBackend } from "../../../../backend/eventsBackend";
import { useNavigate } from "react-router-dom";

export interface Events {
  events: EventEntry[];
}

export default function Events({ events }: Events) {
  const eventsData = eventsBackend().events;
  const navigate = useNavigate();
  return (
    <div className="events py-6">
      <div className="px-10 mx-auto grid grid-cols-6">
        <p className="text-sm font-medium">Recommended Events</p>
        <NavigationButton to="/eventsAll" label="Show All" />
      </div>
      <ul className="px-10 py-2 mx-auto grid gap-2 grid-cols-6">
        {eventsData.map((event, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li
              key={index}
              className="h-40 shadow-xl rounded-xl bg-slate-200"
              onClick={() => {
                // TODO: maybe have a hover, and then click
                navigate("/event/" + event.docId);
              }}
            >
              <img
                className="aspect-video w-45 object-cover object-center rounded-t-xl"
                src={event.image}
                alt=""
              />
              <div className="h-fit">
                {/* <p className="text-sm font-medium text-gray-900">
                  {event.artistId}
                </p> */}
                {/* instead of showing the artistId, make a function which gets the artist info from db to show name */}
                <p className="text-sm font-medium text-gray-900">
                  {event.venue}
                </p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </li>
          </div>
        ))}
      </ul>
      {/* <NavigationButton to="/eventsAll" label="Show All" /> */}
    </div>
  );
}
