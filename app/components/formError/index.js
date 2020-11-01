import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from 'constants/colors';

export default function FormError({ touched, errorText }) {
  return touched && errorText ? <Text style={styles.error}>{errorText}</Text> : <></>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    paddingTop: 10,
  },
});
