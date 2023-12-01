import { Dispatch, SetStateAction } from "react";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown";
import { EventEntry } from "../types/types";

export interface artistLogin {
  weeklyBreakDownHistory: EventEntry[];
  setWeeklyBreakDownHistory: Dispatch<SetStateAction<EventEntry[]>>;
}

// features:
// - other nested components:
// 1. input box for event submission. should have three or so fields you can type into/select (png upload for image, venue location, venue date)
// 2. artist profile image, editable
// 3. artist bio, editable
export default function ArtistLogin(props: artistLogin) {
  // TODO: some functionality for updating based on form submission

  return (
    <div className="artist-login">
      <input
        height="64px"
        width="64px"
        type="image"
        padding-right="50px"
      ></input>
    </div>
  );
}
