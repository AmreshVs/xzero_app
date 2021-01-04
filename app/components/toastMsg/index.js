import React, { createRef } from 'react';
import Toast from 'components/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const toastRef = createRef(null);

export const ToastMsg = (msg, length = 1800) => {
  toastRef?.current?.show(msg, length);
};

export function ToastComponent() {
  const insets = useSafeAreaInsets();
  return (
    <Toast
      ref={toastRef}
      position="top"
      positionValue={10 + insets.top}
      fadeInDuration={750}
      fadeOutDuration={1000}
      opacity={0.8}
    />
  );
}
