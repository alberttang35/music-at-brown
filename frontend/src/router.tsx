// CustomRouter.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HOMEPAGE from "./components/homepage/homepage";
import { Artist, EventEntry } from "./components/types/types";
import EventsAll from "./eventsAll";
import ArtistsAll from "./artistsAll";

const CustomRouter = () => {
  
  const [artistsAll, setartistsAll] = useState<
  Artist[]
>([]);
const [eventsAll, seteventsAll] = useState<
  EventEntry[]
>([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HOMEPAGE />} />
        <Route path="/eventsAll" element={<EventsAll events={eventsAll} />} />
        <Route path="/artistsAll" element={<ArtistsAll artists={artistsAll} />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
