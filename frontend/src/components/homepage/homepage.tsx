import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { Artist, Event, GeoLoc, User } from "../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NAV from "../nav/nav";
import { eventsBackend } from "../../../../backend/eventsBackend";
import { mockArtists1 } from "../mocks/mockArtists";
import { orderArtists, orderEvents } from "../algorithm";
import { mockEvents1 } from "../mocks/mockEvents";
import { mockWeekly1 } from "../mocks/mockWeeklyBreakdown";
import { artistsBackend } from "../../../../backend/artistsBackend";

// do not need this homepage
interface HOMEPAGEProps {
  // WeeklyBreakDownHistory: EventEntry[];
  currentArtist: Artist | undefined;
  setCurrentArtist: Dispatch<SetStateAction<Artist | undefined>>;
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
}

// function for homepage
export default function HOMEPAGE({
  currentArtist,
  setCurrentArtist,
  currentUser,
  setCurrentUser,
}: HOMEPAGEProps) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [events, setEvents] = useState<Event[]>(eventsBackend().events);
  const { allArtists } = artistsBackend();
  const { allEvents } = eventsBackend();

  // const [allEvents, setAllEvents] = useState(eventsBackend().allEvents); // higher level component, used for correspondence between editEvent and EventsList

  const [userLoc, setUserLoc] = useState<GeoLoc>();

  useEffect(() => {
    setArtists(allArtists);
    setEvents(allEvents);
    console.log(allEvents);
  }, [allArtists]);

  useEffect(() => {
    console.log(artists);
    console.log(events);
    if (typeof currentUser !== "undefined") {
      console.log(currentUser);
      orderArtists(artists, setArtists, currentUser.genres);

      window.navigator.geolocation.getCurrentPosition(function (pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        const location = {
          lat: lat,
          lon: lon,
        };
        setUserLoc(location);
      });
      orderEvents(events, setEvents, currentUser.genres, userLoc);
    }
  }, [currentUser]);

  return (
    // want to set dynamic sizing for the grid
    <div className="max-h-screen overflow-visible overscroll-auto">
      <NAV
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentArtist={currentArtist}
        setCurrentArtist={setCurrentArtist}
      />
      <Events events={events} />
      <Artists artists={artists} />
    </div>
  );
}
