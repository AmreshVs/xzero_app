import React, { useState } from 'react';
import { Text } from 'react-native';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Button from 'components/button';
import { ToastMsg } from 'components/toastMsg';
import styles from './styles';

const WithdrawAmount = () => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    if (amount > 5) {
      ToastMsg('Amount cannot be more than 5');
    }
  };

  return (
    <Card>
      <Column marginBottom={10}>
        <Text style={styles.referTitle}>Withdraw</Text>
        <Text style={styles.caption}>Total Earnings 200 AED</Text>
      </Column>
      <Row justifyContent="space-between">
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
    </Card>
  );
};

export default WithdrawAmount;