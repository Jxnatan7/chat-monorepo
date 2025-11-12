import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import type { Theme } from "@/theme";
import { Box, RestyleTextInput } from "@/components/restyle";

export type CodeInputProps = {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  onFullfill?: (code: string) => void;
  autoFocus?: boolean;
  secure?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  inputStyle?: TextInputProps["style"];
  containerStyle?: any;
  testIDPrefix?: string;
};

export type CodeInputHandle = {
  focus: (index?: number) => void;
  clear: () => void;
  setValue: (code: string) => void;
  getValue: () => string;
};

type CellProps = {
  index: number;
  value: string;
  onChange: (index: number, text: string) => void;
  onKeyPress: (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => void;
  onFocus: (index: number) => void;
  autoFocus?: boolean;
  secure?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  style?: TextInputProps["style"];
  testID?: string;
};

const Cell = React.memo(
  forwardRef<RNTextInput, CellProps>((props, ref) => {
    const {
      index,
      value,
      onChange,
      onKeyPress,
      onFocus,
      autoFocus,
      secure,
      keyboardType,
      testID,
    } = props;

    return (
      <RestyleTextInput
        variant="code"
        ref={ref as any}
        value={value}
        onChangeText={(t: string) => onChange(index, t)}
        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
          onKeyPress(index, e)
        }
        onFocus={() => onFocus(index)}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        returnKeyType="done"
        maxLength={1}
        textContentType="oneTimeCode"
        importantForAutofill="yes"
        autoComplete="sms-otp"
        autoFocus={autoFocus}
        accessible
        accessibilityLabel={testID}
        testID={testID}
        autoCapitalize="none"
        spellCheck={false}
        {...(Platform.OS === "android"
          ? { underlineColorAndroid: "transparent" }
          : {})}
      />
    );
  }),
  (prev, next) =>
    prev.value === next.value &&
    prev.style === next.style &&
    prev.testID === next.testID
);

const CodeInput = forwardRef<CodeInputHandle, CodeInputProps>((props, ref) => {
  const {
    length = 6,
    value,
    onChange,
    onFullfill,
    autoFocus = false,
    secure = false,
    keyboardType = Platform.select({ ios: "number-pad", android: "numeric" }),
    testIDPrefix = "code-input",
  } = props;

  const theme = useTheme<Theme>();

  const [internal, setInternal] = useState<string[]>(() =>
    new Array(length).fill("")
  );

  const internalRef = useRef<string[]>(internal);
  useEffect(() => {
    internalRef.current = internal;
  }, [internal]);

  useEffect(() => {
    if (typeof value === "string") {
      const arr = new Array(length).fill("");
      value
        .split("")
        .slice(0, length)
        .forEach((c, i) => (arr[i] = c));
      const same = arr.every((c, i) => c === internalRef.current[i]);
      if (!same) {
        setInternal(arr);
        internalRef.current = arr;
      }
    }
  }, [value, length]);

  const refs = useRef<Array<RNTextInput | null>>(new Array(length).fill(null));

  const focus = useCallback(
    (index = 0) => {
      const i = Math.max(0, Math.min(length - 1, index));
      const input = refs.current[i];
      if (input) {
        input.focus();
        if (Platform.OS === "android") {
          setTimeout(() => {
            try {
              input.setNativeProps({ selection: { start: 1, end: 1 } });
            } catch {}
          }, 0);
        }
      }
    },
    [length]
  );

  useImperativeHandle(
    ref,
    () => ({
      focus,
      clear: () => {
        const empty = new Array(length).fill("");
        setInternal(empty);
        internalRef.current = empty;
        onChange?.("");
      },
      setValue: (code: string) => {
        const arr = new Array(length).fill("");
        code
          .split("")
          .slice(0, length)
          .forEach((c, i) => (arr[i] = c));
        setInternal(arr);
        internalRef.current = arr;
        onChange?.(arr.join(""));
        if (arr.every(Boolean)) onFullfill?.(arr.join(""));
      },
      getValue: () => internalRef.current.join(""),
    }),
    [focus, length, onChange, onFullfill]
  );

  const handleCellChange = useCallback(
    (index: number, text: string) => {
      // paste / multi-char
      if (text.length > 1) {
        const chars = text.split("");
        const next = [...internalRef.current];
        let i = index;
        for (const ch of chars) {
          if (i >= length) break;
          next[i] = ch;
          i++;
        }
        if (value === undefined) {
          setInternal(next);
          internalRef.current = next;
        }
        const joined = next.join("");
        onChange?.(joined);
        if (next.every((c) => c !== "")) onFullfill?.(joined);
        const nextEmpty = next.findIndex((c) => c === "");
        if (nextEmpty !== -1) focus(nextEmpty);
        else
          refs.current[Math.min(length - 1, index + chars.length - 1)]?.blur();
        return;
      }

      const next = [...internalRef.current];
      next[index] = text === "" ? "" : text;
      if (value === undefined) {
        setInternal(next);
        internalRef.current = next;
      }
      const joined = next.join("");
      onChange?.(joined);

      if (text !== "" && index < length - 1) focus(index + 1);
      if (next.every((c) => c !== "")) onFullfill?.(joined);
    },
    [focus, length, onChange, onFullfill, value]
  );

  const handleKeyPress = useCallback(
    (index: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const key = e.nativeEvent.key;
      if (key === "Backspace") {
        const cur = internalRef.current[index];
        if (cur === "") {
          if (index > 0) {
            const prev = index - 1;
            const next = [...internalRef.current];
            next[prev] = "";
            if (value === undefined) {
              setInternal(next);
              internalRef.current = next;
            }
            onChange?.(next.join(""));
            focus(prev);
          }
        } else {
          const next = [...internalRef.current];
          next[index] = "";
          if (value === undefined) {
            setInternal(next);
            internalRef.current = next;
          }
          onChange?.(next.join(""));
        }
      }
    },
    [focus, onChange, value]
  );

  const handleFocus = useCallback((index: number) => {
    const input = refs.current[index];
    if (input) {
      if (Platform.OS === "android") {
        setTimeout(() => {
          try {
            input.setNativeProps({ selection: { start: 0, end: 1 } });
          } catch {}
        }, 0);
      } else {
        try {
          input.setNativeProps({ selection: { start: 0, end: 1 } });
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    if (autoFocus) {
      const firstEmpty = internalRef.current.findIndex((c) => c === "");
      focus(firstEmpty === -1 ? length - 1 : firstEmpty);
    }
  }, []);

  const handleContainerPress = useCallback(() => {
    const firstEmpty = internalRef.current.findIndex((c) => c === "");
    if (firstEmpty === -1) focus(length - 1);
    else focus(firstEmpty);
  }, [focus, length]);

  const cells = useMemo(
    () => new Array(length).fill(0).map((_, i) => i),
    [length]
  );

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <Box style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
        {cells.map((i) => (
          <Cell
            ref={(el: RNTextInput | null) => (refs.current[i] = el) as any}
            key={i}
            index={i}
            value={internal[i]}
            onChange={handleCellChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            autoFocus={i === 0 ? autoFocus : false}
            secure={secure}
            keyboardType={keyboardType}
            testID={`${testIDPrefix}-${i}`}
          />
        ))}
      </Box>
    </TouchableWithoutFeedback>
  );
});

export default CodeInput;
