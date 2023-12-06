import UserLogin from "./userLogin.jsx";
import ArtistLogin from "./artistLogin.js";
import { EventEntry } from "../types/types.js";
import { Artist } from "../types/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown.js";
import { doAlgorithm, orderArtists } from "../algorithm.js";

export interface nav {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
}

export default function NAV(props: nav) {
  const [topUserGenres, setTopUserGenres] = useState<string[]>([]);

  return (
    <div className="grid gap-2 grid-cols-3">
      <ArtistLogin
        weeklyBreakDownHistory={props.weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={props.setWeeklyBreakDownHistory}
      />
      <UserLogin
        topUserGenres={topUserGenres}
        setTopUserGenres={setTopUserGenres}
      />
      {/* <button
        onClick={async () =>
          doAlgorithm(
            props.weeklyBreakDownHistory,
            props.setWeeklyBreakDownHistory,
            topUserGenres
          )
        }
      >
        test test
      </button> */}
    </div>
  );
}
