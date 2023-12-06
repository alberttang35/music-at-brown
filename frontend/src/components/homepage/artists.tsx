// top level function for artist display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction } from "react";
import { Artist } from "../types/types";
import NavigationButton from "../../NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { orderArtists } from "../algorithm";

export interface Artists {
  artists: Artist[];
  //setArtists: Dispatch<SetStateAction<Artist[]>>;
}

export default function Artists({ artists }: Artists) {
  return (
    <div className="Artists">
      <NavigationButton to="/artistsAll" label="Show All" />
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-6">
        {mockArtists1.map((event, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="h-45 w-45 shadow-xl rounded-xl">
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
      <button
        onClick={async () => orderArtists(mockArtists1, ["rap", "rap", "pop"])} // the second argument here is a mock of a user's topGenres. Change it if u want to test smth in particular
      >
        this button console logs scores for artists
      </button>
    </div>
  );
}
