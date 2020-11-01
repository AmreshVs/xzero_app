import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'constants/colors';

export default function Divider({ margin, ...otherStyles }) {
  const styles = StyleSheet.create({
    container: {
      height: 1,
      backgroundColor: colors.gray,
      marginVertical: margin || 5,
      ...otherStyles,
    },
  });
  return <View style={styles.container} />;
}
