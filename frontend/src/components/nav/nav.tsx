import UserLogin from "./userLogin.jsx";
import ArtistLogin from "./artists/artistMenu.js";
import { EventEntry } from "../types/types.js";
import { Artist } from "../types/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";

export interface nav {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
  userTopGenres: string[];
  setUserTopGenres: Dispatch<SetStateAction<string[]>>;
  // allEvents: EventEntry[];
  // setAllEvents: Dispatch<SetStateAction<EventEntry[]>>;
}

export default function NAV(props: nav) {
  return (
    <div className="flex mr-20 flex-row-reverse ">
      <ArtistLogin />
      <UserLogin
        userTopGenres={props.userTopGenres}
        setUserTopGenres={props.setUserTopGenres}
      />
    </div>
  );
}
