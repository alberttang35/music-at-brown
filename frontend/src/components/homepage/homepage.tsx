import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { EventEntry } from "../types/types";
import { SetStateAction, useState } from "react";
import NAV from "../nav/nav";
import UserLogin from "../nav/userLogin"

// do not need this homepage
// export interface HOMEPAGE {
//   WeeklyBreakDownHistory: EventEntry[];
// }

// function for homepage
export default function HOMEPAGE() {

  const [weeklyBreakDownHistory, setWeeklyBreakDownHistory] = useState<
    EventEntry[]
  >([]);

  return (
    <div className="homepage">
      <NAV
        weeklyBreakDownHistory={weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={setWeeklyBreakDownHistory}
      />
      <WeeklyBreakdown weeklyBreakDownHistory={weeklyBreakDownHistory} />
    </div>
  );
}
