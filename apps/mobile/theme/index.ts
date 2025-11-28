import { createTheme } from "@shopify/restyle";
import pallete from "@repo/theme/pallete/index";

const theme = createTheme({
  colors: pallete,
  spacing: {
    none: 0,
    xs: 4,
    s: 6,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
    xxxl: 80,
  },
  containerVariants: {
    chip: {
      maxWidth: 300,
      height: 40,
      p: "s",
      borderRadius: 4,
      backgroundColor: "textBlue",
    },
    defaults: {
      flex: 1,
      p: "m",
      pt: "xl",
      alignItems: "center",
      backgroundColor: "backgroundLight",
    },
    chat: {
      flex: 1,
      px: "l",
      pt: "xl",
      pb: "none",
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
  pressableVariants: {
    input: {
      fontFamily: "Mulish",
      backgroundColor: "inputBackgroundLight",
      color: "inputTextLight",
      flex: 1,
      width: "100%",
      minHeight: 40,
      borderRadius: 6,
      p: "s",
      fontSize: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "s",
    },
    transparent: {
      backgroundColor: "transparent",
    },
    chip: {
      maxWidth: 400,
      alignItems: "center",
      justifyContent: "center",
      p: "s",
      borderRadius: 4,
      backgroundColor: "backgroundGrayLight",
      mr: "s",
    },
    default: {
      backgroundColor: "buttonBackgroundLight",
    },
    defaults: {
      backgroundColor: "buttonBackgroundLight",
    },
  },
  buttonVariants: {
    transparent: {
      backgroundColor: "transparent",
      color: "buttonTextLight",
    },
    chipDisabled: {
      maxWidth: 400,
      alignItems: "center",
      justifyContent: "center",
      p: "s",
      borderRadius: 4,
      backgroundColor: "backgroundGrayLight",
      mr: "s",
      opacity: 0.5,
      color: "buttonTextLight",
    },
    chip: {
      maxWidth: 400,
      alignItems: "center",
      justifyContent: "center",
      p: "s",
      borderRadius: 4,
      backgroundColor: "backgroundGrayLight",
      mr: "s",
      color: "buttonTextLight",
    },
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
    "label-error": {
      width: "100%",
      fontFamily: "Mulish",
      fontSize: 14,
      color: "error",
    },
    label: {
      fontFamily: "Mulish",
      fontSize: 14,
    },
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
    messageOptions: {
      width: "100%",
      backgroundColor: "backgroundLight",
      maxHeight: 80,
    },
  },
});

export type Theme = typeof theme;
export default theme;
