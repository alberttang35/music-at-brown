import React, { useEffect, useState } from "react";
import "./App.css";
import HOMEPAGE from "./components/homepage/homepage";
import NAV from "./components/nav/nav";

// APP
// - homepage.tsx
// - nav.tsx
// - artistLogin.tsx
// - userLogin.tsx
// - searchBar.tsx
// - breakdown.tsx
// - artists.tsx
// - events.tsx

import Router from "./components/utilities/router";

const App = () => {
  return (
    <div className="App">
      {/* the header makes size calculations wrong wrt scrolling, going to remove for now */}
      {/* <h1>Music@Brown</h1> */}
      <Router />
    </div>
  );
};

export default App;
