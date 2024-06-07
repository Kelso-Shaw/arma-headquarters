import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { ThemeToggleProvider } from "./ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";

const App = () => {
  const clanName = process.env.REACT_APP_CLAN_NAME;

  return (
    <ThemeToggleProvider>
      <AuthProvider>
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
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeToggleProvider>
  );
};

export default App;
