import { createTheme } from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors";

const primaryColor = blue[700];
const secondaryColor = blue[500];

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: grey[900],
      paper: grey[800],
    },
    text: {
      primary: grey[100],
      secondary: grey[400],
    },
  },
});
