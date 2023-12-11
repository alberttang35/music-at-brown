// CustomRouter.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HOMEPAGE from "../homepage/homepage";
import { Artist, EventEntry } from "../types/types";
import EventsAll from "../homepage/eventsAll";
import ArtistsAll from "../homepage/artistsAll";
import EditEvent from "../nav/editEvent";
import LoginArtist from "../nav/loginArtist";
import EventHistory from "../nav/editableEventHistory";

const CustomRouter = () => {
  const [artistsAll, setartistsAll] = useState<Artist[]>([]);

  const [eventsAll, seteventsAll] = useState<EventEntry[]>([]);

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
        <Route path="/loginArtist" element={<LoginArtist />} />
        <Route path="/editEventDisplay" element={<EventHistory />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
