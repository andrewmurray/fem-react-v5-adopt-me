import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";
import SearchContext from "./SearchContext";

const App = () => {
  const themeHook = useState("darkblue");
  const searchHook = useState({
    results: []
  });
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <SearchContext.Provider value={searchHook}>
          <div>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </div>
        </SearchContext.Provider>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
