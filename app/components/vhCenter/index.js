import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

export default function VHCenter({ topNav, style, children, ...otherStyles }) {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: topNav ? Dimensions.get('window').height - 50 : '100%',
      ...otherStyles,
    },
  });

  return <View style={[style, styles.container]}>{children}</View>;
}
