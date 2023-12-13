// top level function for artist display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction, useState } from "react";
import { Artist } from "../types/types";
import { NavigationButton } from "../utilities/NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { artistsBackend } from "../../../../backend/artistsBackend";

export interface Artists {
  artists: Artist[];
  // setArtists: Dispatch<SetStateAction<Artist[]>>;
}

export default function Artists({ artists }: Artists) {
  const artistsData = artistsBackend().artists;

  function getLink(artist: Artist) {
    return "https://open.spotify.com/artist/" + artist.spotifyId;
  }

  return (
    <div className="Artists">
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-6">
        {artistsData.map((artist, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="h-45 w-45 shadow-xl rounded-xl">
              <img
                className="h-10 w-10 rounded-full"
                src={artist.image}
                alt=""
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {artist.name}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {artist.links}
                </p>
                <p className="text-sm text-gray-500">{artist.bio}</p>
                <a href={getLink(artist)} target="_blank">
                  Visit on Spotify
                </a>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <NavigationButton to="/artistsAll" label="Show All" />
    </div>
  );
}
