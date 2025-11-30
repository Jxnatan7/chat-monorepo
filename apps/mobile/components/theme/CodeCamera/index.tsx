import {
  Box,
  RestyleCameraView,
  RestyleCameraViewProps,
  Text,
} from "@/components/restyle";
import { CameraType, useCameraPermissions } from "expo-camera";
import { ActivityIndicator, StyleSheet, Vibration } from "react-native";
import Button, { ButtonProps } from "../Button";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useQRCodeScanner } from "@/hooks/useQrCodeScanner";

export type CameraButtonProps = ButtonProps & {
  icon?: React.ReactNode;
  offIcon?: React.ReactNode;
  isOff?: boolean;
};

type CodeCameraProps = RestyleCameraViewProps & {
  onCodeScanned: (code: string) => void;
};

export type CodeCameraHandle = {
  reset: () => void;
};

export const CameraButton = ({
  icon,
  offIcon,
  isOff,
  ...props
}: CameraButtonProps) => (
  <Button variant="cameraOption" {...props}>
    {isOff && offIcon}
    {!isOff && icon}
  </Button>
);

export const CodeCamera = forwardRef<CodeCameraHandle, CodeCameraProps>(
  ({ onCodeScanned, ...props }, ref) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>("back");
    const [flash, setFlash] = useState(false);
    const [scanned, setScanned] = useState(false);

    const handleBarcodeScanned = useCallback((data: string) => {
      setScanned(true);
      Vibration.vibrate(100);
      onCodeScanned(data);
    }, []);

    const { onBarCodeScanned, resetScanner } = useQRCodeScanner({
      onRead: handleBarcodeScanned,
    });

    useImperativeHandle(ref, () => ({
      reset: () => {
        setScanned(false);
        resetScanner();
      },
    }));

    if (!permission) {
      return <ActivityIndicator />;
    }

    if (!permission.granted) {
      return (
        <Box style={styles.permissionContainer}>
          <Text>Você precisa permitir o uso da camera para ler o código</Text>
          <Button
            variant="transparent"
            onPress={requestPermission}
            text="Permitir acesso"
            textProps={{
              style: styles.linkText,
            }}
          />
        </Box>
      );
    }

    const toggleFacing = () => {
      setFacing((prev) => (prev === "back" ? "front" : "back"));
    };

    const toggleFlash = () => {
      setFlash((prev) => !prev);
    };

    return (
      <>
        <Box style={styles.cameraContainer}>
          <RestyleCameraView
            facing={facing}
            enableTorch={flash}
            variant="code"
            onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            {...props}
          />
        </Box>
        <Box style={styles.controlsContainer} paddingTop="s" paddingRight="xxl">
          <CameraButton
            onPress={toggleFlash}
            isOff={flash}
            icon={<Ionicons name="flash" size={24} color="black" />}
            offIcon={
              <Ionicons name="flash-off-outline" size={24} color="black" />
            }
          />
          <CameraButton
            onPress={toggleFacing}
            icon={<Entypo name="cycle" size={24} color="black" />}
          />
        </Box>
      </>
    );
  }
);

const styles = StyleSheet.create({
  permissionContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  linkText: {
    textDecorationLine: "underline",
  },
  cameraContainer: {
    width: "100%",
    maxHeight: 300,
    alignItems: "center",
  },
  controlsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
});
