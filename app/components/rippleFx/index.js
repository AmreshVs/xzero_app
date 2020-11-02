import React from 'react';
import Ripple from 'react-native-material-ripple';

import colors from 'constants/colors';

export default function RippleFX({ children, ...args }) {
  return (
    <Ripple {...args} rippleColor={colors.primary}>
      {children}
    </Ripple>
  );
}
