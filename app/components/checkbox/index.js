import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import colors from 'constants/colors';

export default function Checkbox({ label, checked, handleChecked }) {
  return (
    <View style={styles.checkboxContainer}>
      <TouchableHighlight
        style={styles.container}
        activeOpacity={0.95}
        underlayColor={colors.gray}
        onPress={handleChecked}
      >
        <View style={styles.tickContainer}>
          {checked && <FontAwesomeIcon icon={faCheck} color={colors.primary} size={13} />}
        </View>
      </TouchableHighlight>
      <Text style={styles.label} onPress={handleChecked}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 23,
    height: 23,
    borderWidth: 2,
    borderColor: '#CCC',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  tickContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 'auto',
    marginLeft: 10,
  },
});
