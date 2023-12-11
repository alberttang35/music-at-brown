import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { Artist, EventEntry } from "../types/types";
import { SetStateAction, useEffect, useState } from "react";
import NAV from "../nav/nav";
import { eventsBackend } from "../../../../backend/eventsBackend";

// do not need this homepage
// export interface HOMEPAGE {
//   WeeklyBreakDownHistory: EventEntry[];
// }

// function for homepage
export default function HOMEPAGE() {
  
  const [weeklyBreakDownHistory, setWeeklyBreakDownHistory] = useState<
    EventEntry[]
  >([]);
  const [userTopGenres, setUserTopGenres] = useState<string[]>([]);
  const [artists, setArtists] = useState<
    Artist[]
  >([]);
  const [events, setEvents] = useState<
    EventEntry[]
  >([]);

  // const [allEvents, setAllEvents] = useState(eventsBackend().allEvents); // higher level component, used for correspondence between editEvent and EventsList

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
        <Artists artists={artists} />
      </div>
      <div>
        <Events events={events}/>
      </div>
    </div>
  );
}