import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

import Textbox from 'components/textbox';
import Button from 'components/button';
import colors from 'constants/colors';
import Box from 'components/box';
import Row from 'components/row';
import { font16, font17, fontWeight700, marginTop10, paddingTop10, textBoldDark, textLite } from 'constants/commonStyles';
import { UserDataContext } from 'context';
import { APPLY_PROMOCODE } from 'graphql/mutations';

let promoApplied = 0;

export default function ApplyPromocode({ voucherPrice, price, setPromocodeData, promocodeData }) {
  const { userData } = useContext(UserDataContext);
  const client = useApolloClient();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [promocode, setPromocode] = useState('');
  const [appliedPromocode, setAppliedPromocode] = useState({});

  useEffect(() => {
    if (Object.keys(promocodeData).length <= 1 && promoApplied === 1) {
      clearPromocode();
      promoApplied = 0;
    }
  }, [promocodeData])

  const handleApply = async () => {
    setLoading(true);
    const { data } = await client.mutate({
      mutation: APPLY_PROMOCODE,
      variables: {
        user_id: Number(userData?.id),
        price: Number(price),
        promocode
      }
    });

    if (data?.ApplyPromocode?.applied) {
      promoApplied = 1;
      setPromocodeData(data?.ApplyPromocode);
      setAppliedPromocode(data?.ApplyPromocode);
    }

    setLoading(false);
  }

  const clearPromocode = () => {
    setAppliedPromocode({});
    setPromocode('');
    setPromocodeData({ discountedPrice: voucherPrice });
  }

  return (
    <>
      {appliedPromocode?.applied ?
        <Row>
          <Box width="100%">
            <Text style={styles.title}>Applied Promocode / Referal code</Text>
            <Row justifyContent="space-between" marginTop={5}>
              <Box width="35%">
                <Text style={styles.code}>{appliedPromocode?.promoCodeApplied}</Text>
              </Box>
              <Box>
                <Text style={styles.promoText}>Discount</Text>
                <Text style={styles.caption}>{appliedPromocode?.discount}%</Text>
              </Box>
              <Box>
                <Text style={styles.promoText}>Discounted Price</Text>
                <Text style={styles.caption}>{appliedPromocode?.discountedPrice} {t('aed')}</Text>
              </Box>
            </Row>
            <Row marginTop={10} justifyContent="flex-end">
              <Button width="30%" size="small" icon="times" status="danger" onPress={() => clearPromocode()}>Clear</Button>
            </Row>
          </Box>
        </Row>
        :
        <Box>
          <Text style={styles.title}>{t('add_promocode')}</Text>
          <Text style={styles.caption}>{t('apply_promocode')}</Text>
          <Textbox
            placeholder={t('promocode')}
            icon="percentage"
            value={promocode}
            onChangeText={(text) => setPromocode(text.toUpperCase())}
            autoCapitalize="none"
            style={styles.textbox}
          />
          <Row justifyContent="flex-end">
            <Button size="small" status="success" width="30%" icon="check" onPress={() => handleApply()} loading={loading} outline>{t('apply')}</Button>
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
    ...paddingTop10,
    ...marginTop10
  },
  code: {
    fontWeight: '700',
    backgroundColor: '#FEFAD7',
    padding: 7,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#D8B828',
    borderRadius: 5,
  },
  promoText: {
    color: colors.text_dark
  }
});