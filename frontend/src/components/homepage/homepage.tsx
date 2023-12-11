import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { Artist, EventEntry, GeoLoc } from "../types/types";
import { SetStateAction, useEffect, useState } from "react";
import NAV from "../nav/nav";
import { mockArtists1 } from "../mocks/mockArtists";
import { orderArtists, orderEvents } from "../algorithm";
import { mockEvents1 } from "../mocks/mockEvents";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown";

// do not need this homepage
// export interface HOMEPAGE {
//   WeeklyBreakDownHistory: EventEntry[];
// }

// function for homepage
export default function HOMEPAGE() {
  const [weeklyBreakDownHistory, setWeeklyBreakDownHistory] =
    useState<EventEntry[]>(mockWeekly1);
  const [artists, setArtists] = useState<Artist[]>(mockArtists1);
  const [events, setEvents] = useState<EventEntry[]>(mockEvents1);
  const [userTopGenres, setUserTopGenres] = useState<string[]>([]);
  const [userLoc, setUserLoc] = useState<GeoLoc>();

  useEffect(() => {
    console.log("running algorithms");
    console.log(userTopGenres);
    orderArtists(artists, setArtists, userTopGenres);

    window.navigator.geolocation.getCurrentPosition(function (pos) {
      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;
      const location = {
        lat: lat,
        lon: lon,
      };
      setUserLoc(location);
    });
    orderEvents(events, setEvents, userTopGenres, userLoc);
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
        <Artists artists={artists} />
      </div>
      <div>
        <Events events={events} />
      </div>
    </div>
  );
}
