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
    defaults: {
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
      fontFamily: "Mulish",

      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {},
    infoTitle: {
      fontFamily: "Mulish",
      fontWeight: "bold",
      fontSize: 16,
    },
    infoSubtitle: {
      fontFamily: "Mulish",
      fontSize: 14,
      color: "textGray",
    },
  },
  textInputVariants: {
    default: {
      fontFamily: "Mulish",

      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
      width: "100%",
      height: 40,
      borderRadius: 6,
      p: "s",
      fontSize: 16,
    },
    primary: {
      fontFamily: "Mulish",

      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
    },
    secondary: {
      fontFamily: "Mulish",

      backgroundColor: "inputBackgroundDark",
      color: "inputTextDark",
    },
    code: {
      fontFamily: "Mulish",
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
  flashListVariants: {
    defaults: {
      backgroundColor: "backgroundLight",
      width: "100%",
      maxHeight: 400,
    },
  },
});

export type Theme = typeof theme;
export default theme;
