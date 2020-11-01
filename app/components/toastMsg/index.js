import React, { createRef } from 'react';
import Toast from 'components/toast';

const toastRef = createRef(null);

export const ToastMsg = (msg, length = 1800) => {
  toastRef?.current?.show(msg, length);
};

export function ToastComponent() {
  return (
    <Toast
      ref={toastRef}
      position="bottom"
      positionValue={60}
      fadeInDuration={750}
      fadeOutDuration={1000}
      opacity={0.8}
    />
  );
}
