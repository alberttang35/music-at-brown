import UserLogin from "./userLogin.jsx";
import ArtistLogin from "./artistLogin.js";
import { EventEntry } from "../types/types.js";
import { Artist } from "../types/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";

export interface nav {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
  userTopGenres: string[];
  setUserTopGenres: Dispatch<SetStateAction<string[]>>;
}

export default function NAV(props: nav) {
  // const [topUserGenres, setTopUserGenres] = useState<string[]>([]);

  return (
    <div className="grid gap-2 grid-cols-3">
      <ArtistLogin
        weeklyBreakDownHistory={props.weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={props.setWeeklyBreakDownHistory}
      />
      <UserLogin
        userTopGenres={props.userTopGenres}
        setUserTopGenres={props.setUserTopGenres}
      />
    </div>
  );
}
