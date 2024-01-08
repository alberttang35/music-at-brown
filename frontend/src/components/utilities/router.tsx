// CustomRouter.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HOMEPAGE from "../homepage/homepage";
import { Artist, EventEntry } from "../types/types";
import EventsAll from "../homepage/eventsAll";
import ArtistsAll from "../homepage/artistsAll";
import EditEvent from "../nav/artists/editEvent";
import LoginArtist from "../nav/artists/artistLogin";
import ArtistReturn from "../nav/artists/artistReturn";
import ArtistDashboard from "../nav/artists/artistDashboard";

const CustomRouter = () => {
  const [artistsAll, setartistsAll] = useState<Artist[]>([]);

  const [eventsAll, seteventsAll] = useState<EventEntry[]>([]);

  const [spotifyId, setSpotifyId] = useState<string>("");

  const [currentArtist, setCurrentArtist] = useState<Artist>();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HOMEPAGE
              currentArtist={currentArtist}
              setCurrentArtist={setCurrentArtist}
            />
          }
        />
        <Route path="/eventsAll" element={<EventsAll events={eventsAll} />} />
        <Route
          path="/artistsAll"
          element={<ArtistsAll artists={artistsAll} />}
        />
        <Route path="/editEvent" element={<EditEvent />} />
        <Route
          path="/loginArtist"
          element={
            <LoginArtist
              currentUser={currentArtist}
              setCurrentUser={setCurrentArtist}
            />
          }
        />
        <Route
          path="/returningArtist"
          element={
            <ArtistReturn
              currentUser={currentArtist}
              setCurrentUser={setCurrentArtist}
            />
          }
        />
        <Route
          path="/artistDashboard"
          element={
            <ArtistDashboard
              currentArtist={currentArtist}
              setCurrentArtist={setCurrentArtist}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
