import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { ThemeToggleProvider } from "./ThemeContext";

const App = () => {
  const clanName = process.env.REACT_APP_CLAN_NAME;

  return (
    <ThemeToggleProvider>
      <Router>
        <Nav name={clanName} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
            padding: 10,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeToggleProvider>
  );
};

export default App;
