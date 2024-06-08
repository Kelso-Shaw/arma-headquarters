import { createTheme } from "@mui/material/styles";

/* Color Palette for Lightmode:
	Accent: "#FF6F61"
	Primary: "#00A1E4"
	Secondary: "#3A3D40"
	Background: "#FFFFFF"
	Text Primary: "#3A3D40"
	Text Secondary: "#73777B"
	https://coolors.co/ff6f61-00a1e4-3a3d40-ffffff-73777b
*/

const backgroundDefaultLight = "#FFFFFF";
const primaryColorLight = "#00A1E4";
const secondaryColorLight = "#3A3D40";
const textPrimaryLight = "#3A3D40";
const textSecondaryLight = "#73777B";
const backgroundPaperLight = "#F5F5F5";

/* Color Palette for Darkmode
	Accent: "#FF6F61"
	Primary: "#00A1E4"
	Secondary: "#121212"
	Background: "#1C1C1E"
	Text Primary: "#FFFFFF"
	Text Secondary: "#73777B"
	https://coolors.co/ff6f61-00a1e4-121212-1c1c1e-73777b
*/

const primaryColorDark = "#00A1E4";
const secondaryColorDark = "#121212";
const textPrimaryDark = "#FFFFFF";
const textSecondaryDark = "#73777B";
const backgroundDefaultDark = "#1C1C1E";
const backgroundPaperDark = "#2C2C2E";

const primaryAccent = "#E3B23C";
const textTitle = "#FFFFFF";
const error = "#BF1A2F";
const success = "018E42";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: primaryColorLight,
			accent: primaryAccent,
			error: error,
			success: success,
		},
		secondary: {
			main: secondaryColorLight,
		},
		background: {
			default: backgroundDefaultLight,
			paper: backgroundPaperLight,
		},
		text: {
			primary: textPrimaryLight,
			secondary: textSecondaryLight,
			title: textTitle,
		},
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: primaryColorDark,
			accent: primaryAccent,
			error: error,
			success: success,
		},
		secondary: {
			main: secondaryColorDark,
		},
		background: {
			default: backgroundDefaultDark,
			paper: backgroundPaperDark,
		},
		text: {
			primary: textPrimaryDark,
			secondary: textSecondaryDark,
			title: textTitle,
		},
	},
});
