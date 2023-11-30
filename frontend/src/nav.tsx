import UserLogin from "./userLogin.jsx";
import ArtistLogin from "./artistLogin.js";
import { EventEntry } from "./types.js";
import { Dispatch, SetStateAction } from "react";

export interface nav {
  weeklyBreakDownHistory: EventEntry[]; 
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>; 
}

// should nest in searchBar, artistLogin, userLogin as child components
// just a parent component, so should have top level components if possible
export default function NAV(props:nav) {
  return <div className="nav">
    <UserLogin></UserLogin>
    <ArtistLogin
        weeklyBreakDownHistory={props.weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={props.setWeeklyBreakDownHistory}
    />
  </div>;
}
