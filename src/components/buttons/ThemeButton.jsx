import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeToggle } from "../../ThemeContext";

const ThemeButton = () => {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeButton;