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
import { memo } from 'react';

let promoApplied = 0;

const ApplyPromocode = ({ voucher_id, plan, voucherPrice, setPromocodeData, promocodeData }) => {
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
  }, [promocodeData]);

  useEffect(() => {
    if (promoApplied === 1) {
      clearPromocode();
      promoApplied = 0;
    }
  }, [plan]);

  const handleApply = async () => {
    setLoading(true);
    let params = {};

    if (voucher_id) {
      params = {
        voucher: Number(voucher_id)
      }
    }

    if (plan) {
      params = {
        plan: Number(plan)
      }
    }

    const queryInput = {
      receiver: Number(userData?.id),
      code: promocode,
      ...params,
    };

    const { data, errors } = await client.query({
      query: APPLY_CODE,
      variables: queryInput
    });

    if (errors) {
      ToastMsg(errors[0]?.extensions?.exception?.data?.data[0]?.messages[0]?.message);
      logError({
        screen: 'Apply Promocode',
        module: 'Apply Promocode',
        input: JSON.stringify(queryInput),
        error: JSON.stringify(errors)
      });
    }

    if (data?.ApplyCode?.applied) {
      promoApplied = 1;
      setPromocodeData({ ...promocodeData, ...data?.ApplyCode });
      setAppliedPromocode(data?.ApplyCode);
    }

    setLoading(false);
  }

  const clearPromocode = () => {
    setAppliedPromocode({});
    setPromocode('');
    setPromocodeData({ discountedPrice: promocodeData?.backupPrice || voucherPrice, backupPrice: promocodeData?.backupPrice || voucherPrice });
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
                <Text style={styles.caption}>{appliedPromocode?.discountYouGet} {t('aed')}</Text>
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
            onChangeText={(text) => setPromocode(text)}
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

export default memo(ApplyPromocode);

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
    borderRadius: 6,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  promoText: {
    color: colors.text_dark
  }
});