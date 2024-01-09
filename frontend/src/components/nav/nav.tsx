import UserLogin from "./users/userLogin.jsx";
import ArtistMenu from "./artists/artistMenu.js";
import { EventEntry } from "../types/types.js";
import { Artist } from "../types/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";

export interface nav {
  userTopGenres: string[];
  setUserTopGenres: Dispatch<SetStateAction<string[]>>;
  currentArtist: Artist | undefined;
  setCurrentArtist: Dispatch<SetStateAction<Artist | undefined>>;
}

export default function NAV(props: nav) {
  return (
    <div className="flex mr-20 flex-row-reverse ">
      <ArtistMenu
        currentArtist={props.currentArtist}
        setCurrentArtist={props.setCurrentArtist}
      />
      <UserLogin
        userTopGenres={props.userTopGenres}
        setUserTopGenres={props.setUserTopGenres}
      />
    </div>
  );
}
