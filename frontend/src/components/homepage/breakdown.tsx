import { EventEntry } from "../types/types";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown";

// top level function for weekly breakdown
// - should have some sort of state storing the currently uploaded event profiles etc.
// - have a backend api call to fetch most RECENT entries from the database. mock for now
export interface WeeklyBreakdown {
  weeklyBreakDownHistory: EventEntry[];
}

export default function WeeklyBreakdown({
  weeklyBreakDownHistory,
}: WeeklyBreakdown) {
  return (
    // create an unordered list of the events for the weekly breakdown
    // weekly breakdown so grid of 7 entries
    <ul className="divide-y divide-gray-200 mx-auto grid gap-2 grid-cols-6 overflow-auto p-10">
      {weeklyBreakDownHistory.map((event, index) => (
        // card
        <div key={index} className="h-45 w-45 shadow-xl rounded-xl">
          <img
            className="aspect-video w-45 object-cover object-center rounded-t-xl"
            src={event.image}
            alt=""
          />
          <div className="ml-3 h-10 w-45">
            <p className="text-sm font-medium text-slate-900">
              {"VENUE: " + event.venue}
            </p>
            <p className="text-sm text-slate-500">{"DATE: " + event.date}</p>
          </div>
        </div>
      ))}
    </ul>
  );
}
