// CustomRouter.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HOMEPAGE from "../homepage/homepage";
import { Artist, EventEntry } from "../types/types";
import EventsAll from "../homepage/eventsAll";
import ArtistsAll from "../homepage/artistsAll";
import EditEvent from "../nav/editEvent";
import LoginArtist from "../nav/loginArtist";

const CustomRouter = () => {
  const [artistsAll, setartistsAll] = useState<Artist[]>([]);

  const [eventsAll, seteventsAll] = useState<EventEntry[]>([]);

  const [spotifyId, setSpotifyId] = useState<string>("Input spotify ID here");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HOMEPAGE />} />
        <Route path="/eventsAll" element={<EventsAll events={eventsAll} />} />
        <Route
          path="/artistsAll"
          element={<ArtistsAll artists={artistsAll} />}
        />
        <Route path="/editEvent" element={<EditEvent />} />
        <Route
          path="/loginArtist"
          element={
            <LoginArtist spotifyId={spotifyId} setSpotifyId={setSpotifyId} />
          }
        />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
