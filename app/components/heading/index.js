import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from 'constants/colors';

export default function Heading({ children, paddingBottom, marginBottom, size, color }) {
  const styles = StyleSheet.create({
    heading: {
      fontSize: size || 18,
      fontWeight: '700',
      color: color || colors.text_dark,
      paddingBottom: paddingBottom || 0,
      marginBottom: marginBottom || 0,
      textAlign: 'left',
    },
  });

  return <Text style={styles.heading}>{children}</Text>;
}
