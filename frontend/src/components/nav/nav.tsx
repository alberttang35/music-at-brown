import UserLogin from "./userLogin.jsx";
import ArtistLogin from "./artistLogin.js";
import { EventEntry } from "../types/types.js";
import { Artist } from "../types/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";

export interface nav {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
}

export default function NAV(props: nav) {

  const [iconURL, setIconURL] = useState(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );
  const [topUserGenres, setTopUserGenres] = useState<string[]>([]); 

  return (
    <div className="grid gap-2 grid-cols-3">
      <ArtistLogin
        weeklyBreakDownHistory={props.weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={props.setWeeklyBreakDownHistory}
      />
      <UserLogin
        iconURL={iconURL}
        setIconURL={setIconURL}
        topUserGenres={topUserGenres}
        setTopUserGenres={setTopUserGenres}
      />
    </div>
  );
}
