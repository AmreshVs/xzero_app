import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from 'constants/colors';

export default function HeadingCaption({ heading, caption }) {
  return (
    <>
      <Text style={styles.loginText}>{heading}</Text>
      <Text style={styles.loginCaption}>{caption}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text_dark,
    paddingBottom: 5,
  },
  loginCaption: {
    color: colors.text_lite,
  },
});
