import React, { useContext, memo } from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';

import { ToastMsg } from 'components/toastMsg';
import { UserDataContext } from 'context';
import { WITHDRAW_HISTORY } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { REFER } from 'navigation/routes';
import WithdrawAmount from './withdrawAmount';
import Transactions from './transactions';
import BankInfo from './bankInfo';
import styles from './styles';

const Withdraw = ({ balance, min_withdraw }) => {
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();

  let queryInput = {
    user_id: Number(userData?.id)
  };

  const { data, loading, refetch: _refetch, error } = useQuery(WITHDRAW_HISTORY, {
    variables: queryInput
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

  return (
    <View style={styles.historyContainer}>
      {data?.TransactionInfo?.userBankDetails !== null && <WithdrawAmount balance={balance} min_withdraw={min_withdraw} reload={_refetch} />}
      <BankInfo data={data?.TransactionInfo?.userBankDetails} loading={loading} reload={_refetch} />
      <Transactions data={data?.TransactionInfo?.withdrawalHistory} loading={loading} reload={_refetch} />
    </View>
  )
}

export default memo(Withdraw);