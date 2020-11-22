import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from 'constants/colors';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function CenterSymbol({ icon = "equals", text = "" }) {
  return (
    <View style={styles.symbolContainer}>
      <View style={styles.symbol}>
        {text ?
          <Text style={styles.text}>{text}</Text>
          :
          <FontAwesomeIcon icon={icon} size={15} color={colors.white} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  symbolContainer: {
    alignItems: 'center',
    marginVertical: -10,
    zIndex: 1
  },
  symbol: {
    backgroundColor: colors.chip_1,
    padding: 8,
    borderRadius: 20
  },
  text: {
    color: colors.white,
    fontWeight: '700'
  }
});