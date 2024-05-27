import { Dispatch, SetStateAction } from "react";
import { Artist } from "../types/types";
import { NavigationButton } from "../utilities/NavigationButton";
import { mockArtists1 } from "../mocks/mockArtists";
import { artistsBackend } from "../../../../backend/artistsBackend";
import { useNavigate } from "react-router-dom";

export interface ArtistsAll {
  artists: Artist[];
}

export default function ArtistsAll({ artists }: ArtistsAll) {
  const artistsData = artistsBackend().artists;
  const navigate = useNavigate();

  return (
    <div className="ArtistsAll">
      <NavigationButton to="/" label="Homepage" />
      <ul className="p-10 mx-auto grid gap-2 grid-cols-6">
        {artistsData.map((artist, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li
              key={index}
              className="pt-3 h-fit shadow-xl rounded-xl bg-slate-100 transition ease-in-out hover:bg-slate-50 cursor-pointer"
              onClick={() => {
                navigate("/artist/" + artist.spotifyId);
              }}
            >
              <img
                className="object-cover h-28 w-28 rounded-full mr-auto ml-auto"
                src={artist.image}
                alt=""
              />
              <div className="h-20 grid grid-cols-1">
                <p className="text-sm font-medium text-gray-900 justify-self-center place-self-start pt-1">
                  {artist.name}
                </p>
                <p className="text-sm text-gray-500 justify-self-center place-self-end pb-2.5">
                  {artist.bio}
                </p>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
