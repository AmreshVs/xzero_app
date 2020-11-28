import React, { useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Textbox from 'components/textbox';
import Button from 'components/button';
import colors from 'constants/colors';
import Box from 'components/box';
import Row from 'components/row';
import { font16, font17, fontWeight700, marginTop10, paddingTop10, textBoldDark, textLite } from 'constants/commonStyles';
import { UserDataContext } from 'context';
import { useApolloClient } from '@apollo/client';
import { APPLY_PROMOCODE } from 'graphql/mutations';
import Column from 'components/column';

export default function ApplyPromocode({ price }) {
  const { userData } = useContext(UserDataContext);
  const client = useApolloClient();
  const { t } = useTranslation();
  const [enable, setEnable] = useState(false);
  const [promocode, setPromocode] = useState('');
  const [appliedPromocode, setAppliedPromocode] = useState({});

  const handleApply = async () => {
    const { data } = await client.mutate({
      mutation: APPLY_PROMOCODE,
      variables: {
        user_id: Number(userData?.id),
        price: Number(price),
        promocode
      }
    });
    setAppliedPromocode(data?.ApplyPromocode);
  }

  return (
    <>
      {appliedPromocode?.promoCodeAapplied ?
        <Row marginTop={10}>
          <Box width="100%">
            <Text style={styles.title}>Applied Promocode / Referal code</Text>
            <Row justifyContent="space-between" marginTop={5}>
              <Box>
                <Text style={styles.code}>{appliedPromocode?.promoCodeAapplied}</Text>
              </Box>
              <Box>
                <Text>Discount</Text>
                <Text style={styles.caption}>{appliedPromocode?.discount}%</Text>
              </Box>
              <Box>
                <Text>Discounted Price</Text>
                <Text style={styles.caption}>{appliedPromocode?.discountedPrice} {t('aed')}</Text>
              </Box>
            </Row>
          </Box>
        </Row>
        :
        !enable ?
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
              <Button size="small" status="success" width="30%" icon="check" onPress={() => handleApply()}>{t('apply')}</Button>
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
  },
  code: {
    fontWeight: '700',
    backgroundColor: '#FEFAD7',
    padding: 7,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D8B828',
    borderRadius: 6,
  },
});