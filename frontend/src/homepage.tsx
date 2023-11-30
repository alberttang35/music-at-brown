import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import UserLogin from "./userLogin";
import { useState } from "react";

// function for homepage
export default function HOMEPAGE() {
  const [genres, setGenres] = useState<string[]>([]);

  return (
    <div className="homepage">
      <UserLogin topGenres={genres} setTopGenres={setGenres}></UserLogin>
      <WeeklyBreakdown></WeeklyBreakdown>
      <Artists></Artists>
      <Events></Events>
    </div>
  );
}
