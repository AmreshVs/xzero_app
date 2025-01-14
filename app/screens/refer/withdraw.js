import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ToastMsg } from 'components/toastMsg';
import { getAuthenticationHeader, useReduxAction } from 'constants/commonFunctions';
import { WITHDRAW_HISTORY } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { REFER } from 'navigation/routes';
import WithdrawAmount from './withdrawAmount';
import Transactions from './transactions';
import BankInfo from './bankInfo';
import styles from './styles';
import { FadeInUpAnim } from 'animation';

const Withdraw = ({ refer_program }) => {
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const { t } = useTranslation();

  let queryInput = {
    user_id: Number(userData?.id)
  };

  const { data, loading, refetch: _refetch, error } = useQuery(WITHDRAW_HISTORY, {
    variables: queryInput,
    ...getAuthenticationHeader(userData?.jwt)
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: REFER,
      module: 'Withdraw History',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

  let min_withdraw = data?.GetReferHistory?.referProgram?.minimum_withdrawal_amount;
  let balance = data?.GetReferHistory?.balance;

  return (
    <View style={styles.historyContainer}>
      <FadeInUpAnim>
        {(data?.TransactionInfo?.userBankDetails !== null && refer_program) && <WithdrawAmount loading={loading} balance={balance} min_withdraw={min_withdraw} reload={_refetch} />}
      </FadeInUpAnim>
      <FadeInUpAnim delay={100}>
        {refer_program && <BankInfo data={data?.TransactionInfo?.userBankDetails} loading={loading} reload={_refetch} />}
      </FadeInUpAnim>
      <FadeInUpAnim delay={200}>
        <Transactions data={data?.TransactionInfo?.withdrawalHistory} loading={loading} />
      </FadeInUpAnim>
    </View>
  )
}

export default Withdraw;