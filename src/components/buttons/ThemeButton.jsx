import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
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
