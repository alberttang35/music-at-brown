import UserLogin from "./userLogin.jsx";
import ArtistLogin from "./artistLogin.js";
import { EventEntry } from "../types/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";

export interface nav {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
}

// should nest in searchBar, artistLogin, userLogin as child components
// just a parent component, so should have top level components if possible
export default function NAV(props: nav) {

  const [genres, setGenres] = useState<string[]>([]);

  return (
    <div className="nav">
      <UserLogin topGenres={genres} setTopGenres={setGenres} />
      <ArtistLogin
        weeklyBreakDownHistory={props.weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={props.setWeeklyBreakDownHistory}
      />
    </div>
  );
}
