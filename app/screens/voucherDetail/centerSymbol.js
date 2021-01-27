import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from 'constants/colors';
import Icon from 'icon';

const CenterSymbol = ({ icon = "equals", text = "" }) => {
  return (
    <View style={styles.symbolContainer}>
      <View style={styles.symbol}>
        {text ?
          <Text style={styles.text}>{text}</Text>
          :
          <Icon name={icon} size={14} color={colors.white} wviewBox={450} />
        }
      </View>
    </View>
  )
}

export default memo(CenterSymbol);

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