import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const themeColor = {
  primary: "#EFEFEF",
  secondaryGrey: "#e0e0e0",
  lightGrey: "#EFEFEF",
  secondary: "#1976d2",
  white: "white",
  black: "black",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: themeColor.primary,
    },
    secondary: {
      main: themeColor.secondary,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {},
});

export default theme;
