import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { EventEntry } from "../types/types";
import { SetStateAction, useState } from "react";
import NAV from "../nav/nav";
import { mockArtist1 } from "../mocks/mockArtists";
import {Artist} from "../types/types"

// function for homepage
export default function HOMEPAGE() {

  // artist, event and breakdown history 
  const [weeklyBreakDownHistory, setWeeklyBreakDownHistory] = useState<EventEntry[]>([]);
  const [artistsHistory, setArtistsHistory] = useState<Artist[]>([]);
  const [eventsHistory, setEventsHistory] = useState<EventEntry[]>([]);

  return (
    <div className="homepage">
      <NAV
        weeklyBreakDownHistory={weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={setWeeklyBreakDownHistory}
      />
      <WeeklyBreakdown weeklyBreakDownHistory={weeklyBreakDownHistory} />
      <Artists artists={artistsHistory} setArtists={setArtistsHistory} />
      <Events events={eventsHistory} setEvents={setEventsHistory}/>
    </div>
  );
}
