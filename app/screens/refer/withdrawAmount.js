import React, { useState, memo } from 'react';
import { Text } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Button from 'components/button';
import { ToastMsg } from 'components/toastMsg';
import { getAuthenticationHeader, useReduxAction } from 'constants/commonFunctions';
import { WITHDRAW_AMOUNT } from 'graphql/mutations';
import useErrorLog from 'hooks/useErrorLog';
import { REFER } from 'navigation/routes';
import { ScaleAnim } from 'animation';
import styles from './styles';

const WithdrawAmount = ({ min_withdraw, balance, reload, loading: rootLoading }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const client = useApolloClient();
  const { t } = useTranslation();

  const handleWithdraw = async () => {
    setLoading(true);
    if (amount < min_withdraw) {
      ToastMsg(`${t('amount_less')} ${min_withdraw} ${t('aed')}`);
      setAmount('');
    }
    else if (amount >= balance) {
      ToastMsg(t('amount_more'));
      setAmount('');
    }
    else {
      let mutationInput = {
        user_id: Number(userData?.id),
        withdraw_amount: Number(amount)
      };

      try {
        const { data } = await client.mutate({
          mutation: WITHDRAW_AMOUNT,
          variables: mutationInput,
          ...getAuthenticationHeader(userData?.jwt)
        });

        if (data?.WithdrawMoney?.msg === 'success') {
          setAmount('');
          ToastMsg(t('withdraw_submitted'));
          reload();
        }
      }
      catch (error) {
        // console.log('Withdraw amount error', error);
        ToastMsg(t('error_occured'));
        logError({
          screen: REFER,
          module: '',
          input: JSON.stringify(mutationInput),
          error: JSON.stringify(error)
        });
      }
    }
    setLoading(false);
  };

  return (
    <Card marginBottom={10} loading={rootLoading}>
      <Column marginBottom={10}>
        <Text style={styles.referTitle}>{t('withdraw')}</Text>
        <Row>
          <Text style={styles.caption}>{t('total_earnings')}</Text>
          <Text style={styles.caption}> {balance || 0} {t('aed')}</Text>
        </Row>
      </Column>
      <Row justifyContent="space-between">
        <Box width="58%">
          <ScaleAnim>
            <Textbox
              placeholder={t('enter_amount')}
              icon="money_bill"
              value={String(amount)}
              onChangeText={(text) => setAmount(text)}
              keyboardType='numeric'
              marginTop={0}
            />
          </ScaleAnim>
        </Box>
        <Box width="40%">
          <ScaleAnim>
            <Button icon="coins" onPress={() => handleWithdraw()} disabled={amount === ''} loading={loading}>{t('withdraw')}</Button>
          </ScaleAnim>
        </Box>
      </Row>
      <Row paddingTop={10}>
        <Text style={styles.caption}>{t('minimun_wallet_balance')}</Text>
        <Text style={styles.caption}>{min_withdraw} {t('aed')}</Text>
      </Row>
    </Card>
  );
};

export default memo(WithdrawAmount);