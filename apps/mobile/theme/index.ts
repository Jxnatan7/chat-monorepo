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
    xxl: 64,
    xxxl: 80,
  },
  containerVariants: {
    chat: {
      flex: 1,
      p: "m",
      pt: "xl",
      alignItems: "center",
      backgroundColor: "backgroundGrayLight",
    },
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
    icon: {
      backgroundColor: "transparent",
      color: "buttonTextLight",
    },
    default: {
      backgroundColor: "buttonBackgroundLight",
      color: "buttonTextLight",
    },
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
    header2: {
      fontFamily: "Mulish",
      fontSize: 16,
      lineHeight: 24,
      textAlign: "center",
    },
    messageTime: {
      fontFamily: "Mulish",
      fontSize: 12,
    },
    message: {
      fontFamily: "Mulish",
      fontSize: 16,
      lineHeight: 24,
    },
    containerHeader: {
      fontFamily: "Mulish",
      fontWeight: "bold",
      fontSize: 24,
    },
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
      textAlign: "center",
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
    iconRigth: {
      fontFamily: "Mulish",
      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
      flex: 1,
      height: 40,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      p: "s",
      fontSize: 16,
    },
    iconLeft: {
      fontFamily: "Mulish",
      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
      flex: 1,
      height: 40,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 6,
      borderTopRightRadius: 6,
      p: "s",
      fontSize: 16,
    },
    default: {
      fontFamily: "Mulish",
      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
      flex: 1,
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
    messages: {
      backgroundColor: "backgroundGrayLight",
      width: "100%",
      maxHeight: 800,
    },
    defaults: {
      backgroundColor: "backgroundLight",
      width: "100%",
      maxHeight: 800,
    },
  },
});

export type Theme = typeof theme;
export default theme;
