import { EventEntry } from "./types";

// top level function for weekly breakdown 
    // - should have some sort of state storing the currently uploaded event profiles etc. 
    // - have a backend api call to fetch most RECENT entries from the database. mock for now 
export interface WeeklyBreakdown {
    weeklyBreakDownHistory: EventEntry[]; 
}

export default function WeeklyBreakdown({weeklyBreakDownHistory}: WeeklyBreakdown) {
  return (
    // create an unordered list of the events for the weekly breakdown
    <ul className="weekly-breakdown">
      {weeklyBreakDownHistory.map((event, index) => (
        <div key={index} className="list-element">
          {/* <img className="h-10 w-10 rounded-full" src={event.image} alt="" /> */}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{event.venue}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
          </div>
        </div>
      ))}
    </ul>
  );
}
