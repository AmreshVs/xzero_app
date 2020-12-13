import React, { useContext } from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';

import WithdrawAmount from './withdrawAmount';
import Transactions from './transactions';
import BankInfo from './bankInfo';
import { UserDataContext } from 'context';
import { WITHDRAW_HISTORY } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';
import { ToastMsg } from 'components/toastMsg';
import { REFER } from 'navigation/routes';

export default function Withdraw({ balance, min_withdraw }) {
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const { data, loading, refetch: _refetch, error } = useQuery(WITHDRAW_HISTORY, {
    variables: {
      user_id: Number(userData?.id)
    }
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: REFER,
      module: 'Withdraw History',
      input: JSON.stringify({
        user_id: Number(userData?.id)
      }),
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