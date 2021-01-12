import React, { useContext, memo } from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ToastMsg } from 'components/toastMsg';
import { getAuthenticationHeader } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import { WITHDRAW_HISTORY } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { REFER } from 'navigation/routes';
import WithdrawAmount from './withdrawAmount';
import Transactions from './transactions';
import BankInfo from './bankInfo';
import styles from './styles';

const Withdraw = ({ refer_program }) => {
  const { userData } = useContext(UserDataContext);
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
      {(data?.TransactionInfo?.userBankDetails !== null && refer_program) && <WithdrawAmount loading={loading} balance={balance} min_withdraw={min_withdraw} reload={_refetch} />}
      {refer_program && <BankInfo data={data?.TransactionInfo?.userBankDetails} loading={loading} reload={_refetch} />}
      <Transactions data={data?.TransactionInfo?.withdrawalHistory} loading={loading} />
    </View>
  )
}

export default Withdraw;