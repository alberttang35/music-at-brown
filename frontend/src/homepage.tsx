import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { EventEntry } from "./types";
import { SetStateAction, useState } from "react";
import NAV from "./nav";

// do not need this homepage
// export interface HOMEPAGE {
//   WeeklyBreakDownHistory: EventEntry[];
// }

// function for homepage
export default function HOMEPAGE() {

    const [weeklyBreakDownHistory, setWeeklyBreakDownHistory] = useState<EventEntry[]>([]);

    return(<div className="homepage">
            <WeeklyBreakdown
                weeklyBreakDownHistory={weeklyBreakDownHistory}
            />
            <NAV 
              weeklyBreakDownHistory={weeklyBreakDownHistory}
              setWeeklyBreakDownHistory={setWeeklyBreakDownHistory}
            />
        </div>);  
}
