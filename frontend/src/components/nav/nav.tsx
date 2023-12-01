import UserLogin from "./userLogin.jsx";
import ArtistLogin from "./artistLogin.js";
import { EventEntry } from "../types/types.js";
import { Artist } from "../types/types.js";
import { Dispatch, SetStateAction } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";

export interface nav {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
}

// should nest in searchBar, artistLogin, userLogin as child components
// just a parent component, so should have top level components if possible
export default function NAV(props: nav) {
  // props.setWeeklyBreakDownHistory(mockWeekly1);

  return (
    <div className="nav">
      {/* <UserLogin></UserLogin> */}
      <ArtistLogin
        weeklyBreakDownHistory={props.weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={props.setWeeklyBreakDownHistory}
      />
    </div>
  );
}
