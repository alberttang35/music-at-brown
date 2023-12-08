import { Dispatch, SetStateAction } from "react";
import { Artist } from "./components/types/types";
import NavigationButton from "./NavigationButton";
import { mockArtists1 } from "./components/mocks/mockArtists";
import { mock } from "node:test";
import { artistsBackend } from "../../backend/artistsBackend";

export interface ArtistsAll {
  artists: Artist[];
  //setArtists: Dispatch<SetStateAction<Artist[]>>;
}



export default function ArtistsAll({artists}: ArtistsAll) {
  const artistsData = artistsBackend();
    return(
  <div className="ArtistsAll">
    <NavigationButton to = "/" label = "Go To Homepage"/>
    <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-7">
        {artistsData.map((event, index) => (
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
    </div>
  );
}
