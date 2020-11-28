import React, { useState } from 'react';
import { View, Text } from 'react-native';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import styles from './styles';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Button from 'components/button';
import { ToastMsg } from 'components/toastMsg';

export default function Withdraw() {
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    if (amount > 5) {
      ToastMsg('Amount cannot be more than 5');
    }
  }

  return (
    <View style={styles.historyContainer}>
      <Column marginBottom={10}>
        <Text style={styles.referTitle}>Withdraw</Text>
        <Text style={styles.caption}>Total Earnings 200 AED</Text>
      </Column>
      <Row justifyContent="space-between" marginBottom={10}>
        <Box width="58%">
          <Textbox
            placeholder="Enter amount in AED"
            value={String(amount)}
            onChangeText={(text) => setAmount(text)}
            keyboardType='numeric'
            marginTop={0}
          />
        </Box>
        <Box width="40%">
          <Button icon="bolt" onPress={() => handleWithdraw()} disabled={amount === ''}>Withdraw</Button>
        </Box>
      </Row>
      <Box marginBottom={10}>
        <Text style={styles.referTitle}>Transactions</Text>
      </Box>
      {Array(20).fill(0).map((item, index) => (
        <Card style={styles.referContainer} key={index}>
          <Column width="70%">
            <Text style={styles.title} numberOfLines={1}>{index % 2 ? 'Pending' : 'Completed'}</Text>
            <Text style={styles.caption}>{new Date().toISOString()}</Text>
          </Column>
          <Box width="30%" alignItems="flex-end">
            <Text style={styles.withdrawAmt}>AED 30 -</Text>
          </Box>
        </Card>
      ))}
    </View>
  )
}