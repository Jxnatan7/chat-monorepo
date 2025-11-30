import { useCallback, useRef, useState } from "react";

type UseQRCodeScannerOptions = {
  onRead?: (code: string) => void;
  duplicateDelay?: number;
};

type UseQRCodeScannerType = {
  onBarCodeScanned: ({ data }: { data: string }) => void;
  resetScanner: () => void;
  scannedList: string[];
};

export function useQRCodeScanner({
  onRead,
  duplicateDelay = 2000,
}: UseQRCodeScannerOptions): UseQRCodeScannerType {
  const scannedSetRef = useRef<Set<string>>(new Set());

  const lastScannedRef = useRef<{ data: string; timestamp: number } | null>(
    null
  );

  const [scannedList, setScannedList] = useState<string[]>([]);

  const onBarCodeScanned = useCallback(
    ({ data: _data }: { data: string }) => {
      const data = _data.trim();
      const now = Date.now();

      if (
        lastScannedRef.current &&
        lastScannedRef.current.data === data &&
        now - lastScannedRef.current.timestamp < duplicateDelay
      ) {
        return;
      }

      lastScannedRef.current = { data, timestamp: now };

      if (scannedSetRef.current.has(data)) {
        return;
      }

      scannedSetRef.current.add(data);
      setScannedList((old) => [...old, data]);
      onRead && onRead(data);
    },
    [duplicateDelay, onRead]
  );

  const resetScanner = () => {
    scannedSetRef.current.clear();
    setScannedList([]);
    lastScannedRef.current = null;
  };

  return {
    onBarCodeScanned,
    scannedList,
    resetScanner,
  } as const;
}
