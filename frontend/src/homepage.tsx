import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";


// function for homepage 
export default function HOMEPAGE() {
    return(<div className = "homepage"
        >
            <WeeklyBreakdown></WeeklyBreakdown>
            <Artists></Artists>
            <Events></Events>
        </div>); 
}