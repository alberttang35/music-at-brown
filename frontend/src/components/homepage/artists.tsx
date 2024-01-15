// top level function for artist display
// - should have some sort of state storing the currently uploaded profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now

import { Dispatch, SetStateAction, useState } from "react";
import { Artist } from "../types/types";
import { NavigationButton } from "../utilities/NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { artistsBackend } from "../../../../backend/artistsBackend";
import { useNavigate } from "react-router-dom";

export interface Artists {
  artists: Artist[];
  // setArtists: Dispatch<SetStateAction<Artist[]>>;
}

export default function Artists({ artists }: Artists) {
  const artistsData = artistsBackend().artists;
  const navigate = useNavigate();

  return (
    <div className="Artists">
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-6">
        {artistsData.map((artist, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li
              key={index}
              // className="Artist-card"
              className="pt-2.5 h-45 w-45 rounded-xl bg-slate-300" // shadow-xl
              onClick={() => {
                // TODO: maybe have a hover, and then click
                navigate("/artist/" + artist.spotifyId);
              }}
            >
              <img
                className="object-cover h-20 w-20 rounded-full mr-auto ml-auto" // try to get padding above = padding on sides
                src={artist.image}
                alt=""
              />
              <div className="h-16 ">
                <p className="text-sm font-medium text-gray-900">
                  {artist.name}
                </p>
                <p className="text-sm text-gray-500">{artist.bio}</p>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <NavigationButton to="/artistsAll" label="Show All" />
    </div>
  );
}
