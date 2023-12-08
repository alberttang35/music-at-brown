import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { Artist, EventEntry } from "../types/types";
import { SetStateAction, useEffect, useState } from "react";
import NAV from "../nav/nav";
import { mockArtists1 } from "../mocks/mockArtists";
import { orderArtists } from "../algorithm";

// do not need this homepage
// export interface HOMEPAGE {
//   WeeklyBreakDownHistory: EventEntry[];
// }

// function for homepage
export default function HOMEPAGE() {
  const [weeklyBreakDownHistory, setWeeklyBreakDownHistory] = useState<
    EventEntry[]
  >([]);
  const [artists, setArtists] = useState<Artist[]>(mockArtists1);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [userTopGenres, setUserTopGenres] = useState<string[]>([]);

  useEffect(() => {
    console.log("running algorithms");
    console.log(userTopGenres);
    orderArtists(artists, setArtists, userTopGenres);
  }, [userTopGenres]);

  return (
    // want to set dynamic sizing for the grid
    <div className="max-h-screen overflow-scroll">
      <NAV
        weeklyBreakDownHistory={weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={setWeeklyBreakDownHistory}
        userTopGenres={userTopGenres}
        setUserTopGenres={setUserTopGenres}
      />
      <WeeklyBreakdown weeklyBreakDownHistory={weeklyBreakDownHistory} />
      <div>
        <Artists artists={artists} setArtists={setArtists} />
      </div>
      <div>
        <Events events={events} />
      </div>
    </div>
  );
}
