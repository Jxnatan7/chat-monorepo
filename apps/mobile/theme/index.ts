import { createTheme } from "@shopify/restyle";
import pallete from "@repo/theme/pallete/index";

const theme = createTheme({
  colors: pallete,
  spacing: {
    xs: 4,
    s: 6,
    m: 16,
    l: 24,
    xl: 40,
  },
  containerVariants: {
    screen: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "backgroundLight",
    },
  },
  boxVariants: {
    screen: {
      flex: 1,
      backgroundColor: "backgroundLight",
    },
  },
  buttonVariants: {
    default: {
      backgroundColor: "buttonBackgroundLight",
      color: "buttonTextLight",
    },
    primary: {
      backgroundColor: "buttonBackgroundLight",
      color: "buttonTextLight",
    },
    secondary: {
      backgroundColor: "buttonBackgroundGray",
      color: "buttonTextDark",
    },
  },
  textVariants: {
    button: {
      fontFamily: "Mulish",
      fontWeight: 600,
      fontSize: 18,
      color: "buttonTextLight",
    },
    header: {
      fontFamily: "Mulish",
      fontWeight: "bold",
      fontSize: 30,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {},
  },
});

export type Theme = typeof theme;
export default theme;
