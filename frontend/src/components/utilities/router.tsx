// CustomRouter.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HOMEPAGE from "../homepage/homepage";
import { Artist, EventEntry, User } from "../types/types";
import EventsAll from "../homepage/eventsAll";
import ArtistsAll from "../homepage/artistsAll";
import EditEvent from "../nav/artists/editEvent";
import LoginArtist from "../nav/artists/artistLogin";
import ArtistReturn from "../nav/artists/artistReturn";
import ArtistDashboard from "../nav/artists/artistDashboard";
import UploadAndDisplayImage from "../nav/artists/UploadImage";
import ArtistProfile from "../homepage/artistProfile";
import EventProfile from "../homepage/eventProfile";

const CustomRouter = () => {
  const [artistsAll, setartistsAll] = useState<Artist[]>([]);

  const [eventsAll, seteventsAll] = useState<EventEntry[]>([]);

  const [currentArtist, setCurrentArtist] = useState<Artist>();

  const [currentUser, setCurrentUser] = useState<User>();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HOMEPAGE
              currentArtist={currentArtist}
              setCurrentArtist={setCurrentArtist}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/eventsAll" element={<EventsAll events={eventsAll} />} />
        <Route
          path="/artistsAll"
          element={<ArtistsAll artists={artistsAll} />}
        />
        <Route
          path="/editEvent"
          element={
            <EditEvent
              currentArtist={currentArtist}
              setCurrentArtist={setCurrentArtist}
            />
          }
        />
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
        <Route path="/artist/:id" element={<ArtistProfile />} />
        <Route
          path="event/:id"
          element={
            <EventProfile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/test" element={<UploadAndDisplayImage />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
