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
import { APPLY_CODE } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';

let promoApplied = 0;

export default function ApplyPromocode({ voucherPrice, price, setPromocodeData, promocodeData }) {
  const { userData } = useContext(UserDataContext);
  const client = useApolloClient();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { logError } = useErrorLog();
  const [promocode, setPromocode] = useState('');
  const [appliedPromocode, setAppliedPromocode] = useState({});

  useEffect(() => {
    if (promocodeData && Object.keys(promocodeData).length <= 1 && promoApplied === 1) {
      clearPromocode();
      promoApplied = 0;
    }
  }, [promocodeData])

  const handleApply = async () => {
    setLoading(true);
    const queryInput = {
      receiver: Number(userData?.id),
      price: Number(price),
      code: promocode
    };

    const { data, error } = await client.query({
      query: APPLY_CODE,
      variables: queryInput
    });

    if (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: 'Apply Promocode',
        module: 'Apply Promocode',
        input: JSON.stringify(queryInput),
        error: JSON.stringify(error)
      });
    }

    if (data?.ApplyCode?.applied) {
      promoApplied = 1;
      setPromocodeData(data?.ApplyCode);
      setAppliedPromocode(data?.ApplyCode);
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
            <Text style={styles.title}>{t('applied_code')}</Text>
            <Row justifyContent="space-between" marginTop={5}>
              <Box width="35%">
                <Text style={styles.code}>{appliedPromocode?.codeApplied}</Text>
              </Box>
              <Box>
                <Text style={styles.promoText}>{t('discount')}</Text>
                <Text style={styles.caption}>{appliedPromocode?.discount}%</Text>
              </Box>
              <Box>
                <Text style={styles.promoText}>{t('discounted_price')}</Text>
                <Text style={styles.caption}>{appliedPromocode?.discountedPrice} {t('aed')}</Text>
              </Box>
            </Row>
            <Row marginTop={10} justifyContent="flex-end">
              <Button width="30%" size="small" icon="times" status="danger" onPress={() => clearPromocode()}>{t('clear')}</Button>
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