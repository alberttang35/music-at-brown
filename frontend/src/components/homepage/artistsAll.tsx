import { Dispatch, SetStateAction } from "react";
import { Artist } from "../types/types";
import { NavigationButton } from "../utilities/NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { artistsBackend } from "../../../../backend/artistsBackend";

export interface ArtistsAll {
  artists: Artist[];
}

export default function ArtistsAll({ artists }: ArtistsAll) {
  const artistsData = artistsBackend().artists;

  return (
    <div className="ArtistsAll">
      <NavigationButton to="/" label="Go To Homepage" />
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-7">
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
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
