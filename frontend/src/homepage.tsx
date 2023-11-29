import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import UserLogin from "./userLogin";

// function for homepage
export default function HOMEPAGE() {
  return (
    <div className="homepage">
      <UserLogin></UserLogin>
      <WeeklyBreakdown></WeeklyBreakdown>
      <Artists></Artists>
      <Events></Events>
    </div>
  );
}
