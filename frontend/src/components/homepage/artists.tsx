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
      <div className="px-10 mx-auto grid grid-cols-6">
        <p className="text-sm font-medium">Recommended Artists</p>
        <NavigationButton to="/artistsAll" label="Show All" />
      </div>
      <ul className="px-10 py-2 mx-auto grid gap-2 grid grid-cols-6">
        {/* Maybe have the number of grid columns adjust according to the zoom */}
        {artistsData.map((artist, index) =>
          index < 6 ? (
            <div key={index}>
              {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
              <li
                key={index}
                className="pt-3 h-fit rounded-xl bg-slate-100 transition ease-in-out hover:bg-slate-50 cursor-pointer" // shadow-xl
                onClick={() => {
                  // TODO: maybe have a hover, and then click
                  navigate("/artist/" + artist.spotifyId);
                }}
              >
                <img
                  className="object-cover h-28 w-28 rounded-full mr-auto ml-auto"
                  src={artist.image}
                  alt={artist.name}
                />
                <div className="pt-1 h-20 grid grid-cols-1">
                  <p className="text-sm font-medium text-gray-900 justify-self-center place-self-start pt-1">
                    {artist.name}
                  </p>
                  <p className="text-sm text-gray-500 justify-self-center place-self-end pb-2.5">
                    {artist.bio}
                  </p>
                </div>
              </li>
            </div>
          ) : (
            <></>
          )
        )}
      </ul>
    </div>
  );
}
