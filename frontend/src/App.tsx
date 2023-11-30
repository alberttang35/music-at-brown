import React, { useEffect, useState } from "react";
import "./styles/App.css";
import HOMEPAGE from "./homepage";
import NAV from "./nav";

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
      {/* <NAV></NAV> */}
      <HOMEPAGE></HOMEPAGE>
    </div>
  );
}

export default App;
