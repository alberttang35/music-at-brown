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

function App() {
  return (
    <div className="App">
      <h1>Music@Brown</h1>
      <HOMEPAGE></HOMEPAGE>
    </div>
  );
}

export default App;
