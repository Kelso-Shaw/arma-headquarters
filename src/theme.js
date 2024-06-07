import { createTheme } from "@mui/material/styles";

/* Color Palette for Lightmode:
	Accent: "#E3B23C"
	Primary: "#3C7C50"
	Secondary: "#222E50"
	Background: "#fafafa"
	Text Primary: "#FAFAFA"
	Text Secondary: "#9EA3B0"
	https://coolors.co/E3B23C-3c7c50-222e50-fafafa-9EA3B0
*/

const backgroundDefaultLight = "#fafafa";
const primaryColorLight = "#3C7C50";
const secondaryColorLight = "#222E50";
const textPrimaryLight = "#FAFAFA";
const textSecondaryLight = "#9EA3B0";
const backgroundPaperLight = primaryColorLight;

/* Color Palette for Darkmode
	Accent: "#E3B23C"
	Primary: "#2A2A72"
	Secondary: "#232528"
	Background: "#232528"
	Text Primary: "#FAFAFA"
	Text Secondary: "#9EA3B0"
	https://coolors.co/E3B23C-2A2A72-232528-FAFAFA-9EA3B0

*/

const primaryColorDark = "#2A2A72";
const secondaryColorDark = "#232528";
const textPrimaryDark = "#FAFAFA";
const textSecondaryDark = "#9EA3B0";
const backgroundDefaultDark = "#232528";
const backgroundPaperDark = primaryColorDark;

const primaryAccent = "#E3B23C";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: primaryColorLight,
			accent: primaryAccent,
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
		},
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: primaryColorDark,
			accent: primaryAccent,
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
		},
	},
});
