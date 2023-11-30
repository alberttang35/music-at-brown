import { EventEntry } from "./types";

// top level function for weekly breakdown 
    // - should have some sort of state storing the currently uploaded event profiles etc. 
    // - have a backend api call to fetch most RECENT entries from the database. mock for now 
export interface WeeklyBreakdown {
    WeeklyBreakDownHistory: EventEntry[]; 
}

export default function WeeklyBreakdown({WeeklyBreakDownHistory}: WeeklyBreakdown) {
  return (
    // create an unordered list of the events for the weekly breakdown
    <div className="weeklyBreakdown">
      <ul className="divide-y divide-gray-200">
        {WeeklyBreakDownHistory.map((event, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="py-4 flex">
              <img
                className="h-10 w-10 rounded-full"
                src={event.image}
                alt=""
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {event.venue}
                </p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
