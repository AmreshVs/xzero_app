import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import colors from 'constants/colors';

export default function ProgressItem({ label, fill = true, path = false, width = '30%' }) {
  const containerStyle = {
    width: width,
  };

  return (
    <View style={[containerStyle, styles.container]}>
      {path && <View style={fill ? styles.progressLineFilled : styles.progressLine} />}
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={faCheck} color={colors.white} size={15} />
      </View>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 35,
    height: 35,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    zIndex: 1,
  },
  text: {
    color: colors.text_lite,
  },
  progressLine: {
    height: 4,
    width: '100%',
    backgroundColor: colors.gray,
    borderRadius: 5,
    position: 'absolute',
    top: '25%',
    left: -38,
    zIndex: 0,
  },
  progressLineFilled: {
    height: 4,
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
    position: 'absolute',
    top: '25%',
    left: -38,
    zIndex: 0,
  },
});
