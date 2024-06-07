import { CssBaseline, ThemeProvider } from "@mui/material";
import React, {
	createContext,
	useState,
	useMemo,
	useContext,
	useEffect,
} from "react";
import { darkTheme, lightTheme } from "./theme";

const ThemeToggleContext = createContext();

export const ThemeToggleProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? JSON.parse(savedTheme) : false;
	});

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(isDark));
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark((prevIsDark) => !prevIsDark);
	};

	const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

	return (
		<ThemeToggleContext.Provider value={{ isDark, toggleTheme }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeToggleContext.Provider>
	);
};

export const useThemeToggle = () => useContext(ThemeToggleContext);
