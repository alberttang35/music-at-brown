import { Dispatch, SetStateAction, useState } from "react";
import { Event } from "../types/types";
import { NavigationButton } from "../utilities/NavigationButton";
import { mockEvents1 } from "../mocks/mockEvents";
import { eventsBackend } from "../../../../backend/eventsBackend";
import { useNavigate } from "react-router-dom";
// import { Eve } from "../types/EventEntry";

export interface EventsAll {
  events: Event[];
}

export default function EventsAll({ events }: EventsAll) {
  // Custom events data from the backend
  const allEvents = eventsBackend().allEvents;
  const navigate = useNavigate();

  return (
    <div className="max-h-screen overflow-visible overscroll-auto">
      <NavigationButton to="/" label="Homepage" />
      <ul className="p-10 mx-auto grid gap-2 grid-cols-6">
        {allEvents.map((event, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li
              key={index}
              className="h-40 shadow-xl rounded-xl bg-slate-100 transition ease-in-out hover:bg-slate-50 cursor-pointer"
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
                <p className="text-sm font-medium text-gray-900">
                  {/* this could be artistId, but that wouldnt be helpful */}
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
