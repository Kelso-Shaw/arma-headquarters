import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../AuthContext";

const Logout = () => {
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log(auth);
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
