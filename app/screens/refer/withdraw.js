import React from 'react';
import { View } from 'react-native';

import WithdrawAmount from './withdrawAmount';
import Transactions from './transactions';
import BankInfo from './bankInfo';
import styles from './styles';

export default function Withdraw() {
  return (
    <View style={styles.historyContainer}>
      <WithdrawAmount />
      <BankInfo />
      <Transactions />
    </View>
  )
}