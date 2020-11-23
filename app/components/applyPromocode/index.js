import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Textbox from 'components/textbox';
import Button from 'components/button';
import { font16, font17, fontWeight700, marginTop10, paddingTop10, textBoldDark, textLite } from 'constants/commonStyles';
import colors from 'constants/colors';
import Box from 'components/box';
import Row from 'components/row';

export default function ApplyPromocode() {
  const { t } = useTranslation();
  const [enable, setEnable] = useState(false);
  const [promocode, setPromocode] = useState('');

  return (
    <>
      {!enable ?
        <Text style={styles.promocode} onPress={() => setEnable(true)}>Have Promocode?</Text>
        :
        <Box paddingTop={10}>
          <Text style={styles.title}>{t('add_promocode')}</Text>
          <Text style={styles.caption}>{t('apply_promocode')}</Text>
          <Textbox
            placeholder={t('promocode')}
            icon="percentage"
            value={promocode}
            onChangeText={(text) => setPromocode(text)}
            autoCapitalize="none"
            style={styles.textbox}
          />
          <Row justifyContent="flex-end">
            <Button size="small" status="text_lite" width="32%" icon="times" onPress={() => setEnable(false)}>{t('cancel')}</Button>
            <Box marginHorizontal={5} />
            <Button size="small" status="success" width="30%" icon="check">{t('apply')}</Button>
          </Row>
        </Box>
      }
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 3,
    ...textBoldDark,
    ...font17,
  },
  caption: {
    ...textLite
  },
  textbox: {
    marginVertical: 10,
    ...marginTop10,
  },
  promocode: {
    color: colors.chip_1,
    ...fontWeight700,
    ...font16,
    ...paddingTop10
  }
});