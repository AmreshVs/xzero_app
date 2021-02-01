import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import colors from 'constants/colors';

export default function Heading({ children, paddingBottom, marginBottom, size, color }) {
  const styles = StyleSheet.create({
    heading: {
      fontSize: size || 18,
      fontWeight: '700',
      color: color || colors.text_dark,
      paddingBottom: 5,
      textAlign: 'left',
    },
    bottomBorder: {
      width: 30,
      height: 7,
      backgroundColor: colors.primary,
      paddingBottom: paddingBottom || 0,
      marginBottom: marginBottom || 0,
      borderRadius: 10
    }
  });

  return (
    <>
      <Text style={styles.heading}>
        {children}
      </Text>
      <View style={styles.bottomBorder} />
    </>
  )
}
