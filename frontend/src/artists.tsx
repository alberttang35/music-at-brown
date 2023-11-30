// top level function for artist display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";
import { Artist } from "./types";



export interface Artists {
  artists: Artist[];
  setArtists: Dispatch<SetStateAction<Artist[]>>;
}



export default function Artists({artists}: Artists) {
  <div className="events">
      <ul className="divide-y divide-gray-200">
        {artists.map((event, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="py-4 flex">
              <img
                className="h-10 w-10 rounded-full"
                src={event.image}
                alt=""
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {event.name}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {event.links}
                </p>
                <p className="text-sm text-gray-500">{event.bio}</p>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  ;
}
