import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import colors from 'constants/colors';

export default function RadioButton({ label, checked, handleChecked }) {
  return (
    <View style={styles.radioContainer}>
      <TouchableHighlight
        style={styles.container}
        activeOpacity={0.95}
        underlayColor={colors.gray}
        onPress={handleChecked}
      >
        <View style={styles.tickContainer}>{checked && <View style={styles.selected} />}</View>
      </TouchableHighlight>
      <Text style={styles.label} onPress={handleChecked}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#CCC',
    borderRadius: 15,
    backgroundColor: '#FFF',
    padding: 3,
  },
  tickContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 'auto',
    marginLeft: 10,
  },
  selected: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
});
