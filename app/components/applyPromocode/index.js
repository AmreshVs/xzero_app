import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Textbox from 'components/textbox';
import Button from 'components/button';
import { font17, textBoldDark, textLite } from 'constants/commonStyles';
import colors from 'constants/colors';

export default function ApplyPromocode() {
  const [enable, setEnable] = useState(false);
  const [promocode, setPromocode] = useState('');

  return (
    <>
      {!enable ?
        <Text style={styles.promocode} onPress={() => setEnable(true)}>Have Promocode?</Text>
        :
        <>
          <Text style={styles.title}>Add Promocode</Text>
          <Text style={styles.caption}>Apply promocode and get discount on this purchase</Text>
          <Textbox
            placeholder="Promocode"
            icon="percentage"
            value={promocode}
            onChangeText={(text) => setPromocode(text)}
            autoCapitalize="none"
            style={styles.textbox}
          />
          <Button icon="check">Apply Promocode</Button>
        </>
      }
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    ...textBoldDark,
    ...font17
  },
  caption: {
    ...textLite
  },
  textbox: {
    marginTop: 10,
    marginVertical: 10
  },
  promocode: {
    color: colors.chip_1,
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 10
  }
});