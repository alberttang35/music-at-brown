import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Login } from "../../utilities/NavigationButton";
import { artistsBackend } from "../../../../../backend/artistsBackend";
import { ControlledInput } from "../../utilities/controlledInput";
import { Artist } from "../../types/types";

interface ArtistDashboardProps {
  currentArtist: Artist;
  setCurrentArtist: Dispatch<SetStateAction<Artist>>;
}

export default function artistDashboard({
  currentArtist,
  setCurrentArtist,
}: ArtistDashboardProps) {
  const { onSubmitArtist } = artistsBackend(); // imported function for submitting artists to backend, on backend

  // allow editing of artist

  useEffect(() => {
    // console.log(currentArtist);
  });

  //   function log() {
  //     console.log(currentArtist);
  //   }
  return (
    <div>
      <img
        className="rounded-full"
        src={currentArtist.image}
        width="100px"
        height="100px"
      ></img>
      <div className="flex flex-col justify-center gap-y-2">
        <Login
          to="/"
          label="Homepage"
          className="mt-4 grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
        />
        <p> {currentArtist.name} </p>
        <p> {currentArtist.genres} </p>
      </div>
    </div>
  );
}
