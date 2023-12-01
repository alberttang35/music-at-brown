// App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import eventsAll from "./components/homepage/eventsAll";
import artistsAll from "./components/homepage/artistsAll";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/eventsAll" Component={eventsAll} />
        <Route path="/artistsAll" Component={artistsAll} />
      </Switch>
    </Router>
  );
};

export default App;