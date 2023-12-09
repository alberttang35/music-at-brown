// CustomRouter.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HOMEPAGE from "./components/homepage/homepage";
import { Artist, EventEntry } from "./components/types/types";
import EventsAll from "./components/homepage/eventsAll";
import ArtistsAll from "./components/homepage/artistsAll";
import EditEvent from "./components/nav/editEvent";


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
        <Route path="/editEvent" element={<EditEvent/>} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
