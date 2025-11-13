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
      p: "m",
      pt: "xl",
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
  textInputVariants: {
    default: {
      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
      width: "100%",
      height: 40,
      borderRadius: 6,
      p: "s",
      fontSize: 16,
    },
    primary: {
      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
    },
    secondary: {
      backgroundColor: "inputBackgroundDark",
      color: "inputTextDark",
    },
    code: {
      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
      width: 30,
      height: 30,
      borderRadius: "50%",
      textAlign: "center",
      fontSize: 40,
      fontWeight: "700",
    },
  },
});

export type Theme = typeof theme;
export default theme;
