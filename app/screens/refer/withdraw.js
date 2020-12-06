import React, { useContext } from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';

import WithdrawAmount from './withdrawAmount';
import Transactions from './transactions';
import BankInfo from './bankInfo';
import { UserDataContext } from 'context';
import { WITHDRAW_HISTORY } from 'graphql/queries';
import styles from './styles';

export default function Withdraw({ balance, min_withdraw }) {
  const { userData } = useContext(UserDataContext);
  const { data, loading, refetch: _refetch } = useQuery(WITHDRAW_HISTORY, {
    variables: {
      user_id: Number(userData?.id)
    }
  });

  return (
    <View style={styles.historyContainer}>
      {data?.TransactionInfo?.userBankDetails !== null && <WithdrawAmount balance={balance} min_withdraw={min_withdraw} reload={_refetch} />}
      <BankInfo data={data?.TransactionInfo?.userBankDetails} loading={loading} reload={_refetch} />
      <Transactions data={data?.TransactionInfo?.withdrawalHistory} loading={loading} reload={_refetch} />
    </View>
  )
}