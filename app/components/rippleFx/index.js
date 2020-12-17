import React from 'react';
import Ripple from 'react-native-material-ripple';

import colors from 'constants/colors';

export default function RippleFX({ children, rippleSize, ...args }) {
  return (
    <Ripple rippleSize={rippleSize || 100} {...args}>
      {children}
    </Ripple>
  );
}
