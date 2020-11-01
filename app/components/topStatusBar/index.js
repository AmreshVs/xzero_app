import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

import colors from 'constants/colors';

export default function TopStatusBar() {
  return <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />;
}

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: Constants.statusBarHeight,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
