import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Column({ children, vcenter, style, ...otherStyles }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: vcenter ? 'center' : 'flex-start',
          ...otherStyles,
        },
      }),
    []
  );

  return <View style={[style, styles.container]}>{children}</View>;
}
