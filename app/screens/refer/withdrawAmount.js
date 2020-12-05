import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { useApolloClient } from '@apollo/client';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Button from 'components/button';
import { ToastMsg } from 'components/toastMsg';
import { UserDataContext } from 'context';
import styles from './styles';

const WithdrawAmount = () => {
  const [amount, setAmount] = useState('');
  const { userData } = useContext(UserDataContext);
  const client = useApolloClient();

  const handleWithdraw = async () => {
    if (amount < 30) {
      ToastMsg('Amount cannot be less than 30 AED');
    }
    else if (amount >= 200) {
      ToastMsg('Amount cannot be more than your wallet balance');
    }
    else {
      // const data = 
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
            icon="money-bill"
            value={String(amount)}
            onChangeText={(text) => setAmount(text)}
            keyboardType='numeric'
            marginTop={0}
          />
        </Box>
        <Box width="40%">
          <Button icon="coins" onPress={() => handleWithdraw()} disabled={amount === ''}>Withdraw</Button>
        </Box>
      </Row>
      <Box paddingTop={10}>
        <Text style={styles.caption}>Note: Mininum wallet balance to withdraw is 30 AED</Text>
      </Box>
    </Card>
  );
};

export default WithdrawAmount;