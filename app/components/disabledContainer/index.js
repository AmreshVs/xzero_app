import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'constants/colors';

export default function DisabledContainer({ status, children, style, ...otherStyles }) {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    disabled: {
      ...otherStyles,
      backgroundColor: colors.lite_gray,
      opacity: 0.5,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 99,
    },
  });
  return (
    <View style={[style, styles.container]}>
      <View style={!status ? styles.disabled : {}} />
      {children}
    </View>
  );
}
