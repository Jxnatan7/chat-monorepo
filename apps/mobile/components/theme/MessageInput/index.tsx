// import {
//   Box,
//   RestyleTextInputProps,
//   RestyleTouchableOpacity,
// } from "@/components/restyle";
// import { TextInput } from "../TextInput";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import theme from "@/theme";
// import { Dimensions } from "react-native";

// export type MessageInputProps = RestyleTextInputProps;

// export const MessageInput = ({ ...props }: MessageInputProps) => {
//   return (
//     <Box
//       width={Dimensions.get("window").width}
//       height={100}
//       flexDirection="row"
//       alignItems="flex-start"
//       justifyContent="center"
//       p="l"
//       gap="s"
//       backgroundColor="backgroundLight"
//       borderTopColor="borderGray"
//       borderTopWidth={1}
//       position="absolute"
//       bottom={0}
//     >
//       <Box
//         width="100%"
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="center"
//         gap="s"
//       >
//         <TextInput maxWidth="90%" {...props} />
//         <RestyleTouchableOpacity
//           variant="icon"
//           justifyContent="center"
//           alignItems="center"
//           flex={1}
//         >
//           <FontAwesome name="send" size={24} color={theme.colors.textBlue} />
//         </RestyleTouchableOpacity>
//       </Box>
//     </Box>
//   );
// };

import React, { useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  EmitterSubscription,
} from "react-native";
import {
  Box,
  RestyleTextInputProps,
  RestyleTouchableOpacity,
} from "@/components/restyle";
import { TextInput } from "../TextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import theme from "@/theme";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type MessageInputProps = RestyleTextInputProps;

export const MessageInput = ({ ...props }: MessageInputProps) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = (e: any) => {
      const keyboardHeight = e.endCoordinates?.height ?? 0;
      const toValue = -keyboardHeight + insets.bottom - 50;
      const duration = e.duration ?? 250;
      Animated.timing(translateY, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    };

    const onHide = (e: any) => {
      const duration = e.duration ?? 200;
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    };

    const subShow: EmitterSubscription = Keyboard.addListener(
      showEvent,
      onShow
    );
    const subHide: EmitterSubscription = Keyboard.addListener(
      hideEvent,
      onHide
    );

    return () => {
      subShow.remove();
      subHide.remove();
    };
  }, [translateY, insets.bottom]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Box
        width={Dimensions.get("window").width}
        minHeight={120}
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="center"
        p="l"
        gap="s"
        backgroundColor="backgroundLight"
        borderTopColor="borderGray"
        borderTopWidth={1}
      >
        <Box
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="s"
        >
          <TextInput maxWidth="90%" {...props} />
          <RestyleTouchableOpacity
            variant="icon"
            justifyContent="center"
            alignItems="center"
            flex={1}
          >
            <FontAwesome name="send" size={24} color={theme.colors.textBlue} />
          </RestyleTouchableOpacity>
        </Box>
      </Box>
    </Animated.View>
  );
};
