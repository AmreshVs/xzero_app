import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { getShadowStyle } from 'constants/commonFunctions';
import Loader from 'components/loader';

export default function Card({ children, style, loading, shadow = true, ...otherStyles }) {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.white,
      ...getShadowStyle(shadow),
      ...otherStyles,
      zIndex: -1
    },
  });

  return <View style={[styles.container, style]}>{loading ? <Loader spinner /> : children}</View>;
}
