import React from 'react';
import { View, Text } from 'react-native';
import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Divider from 'components/divider';
import styles from './styles';

const Transactions = () => {
  return (
    <Card marginTop={10}>
      <Box marginBottom={5}>
        <Text style={styles.referTitle}>Transactions</Text>
      </Box>
      {Array(20).fill(0).map((item, index) => (
        <View key={index}>
          {index !== 0 && <Divider />}
          <View style={styles.referContainer}>
            <Column width="70%">
              <Text style={styles.title}>{index % 2 ? 'Pending' : 'Completed'}</Text>
              <Text style={styles.caption}>{new Date().toISOString()}</Text>
            </Column>
            <Box width="30%" alignItems="flex-end">
              <Text style={styles.withdrawAmt}>AED 30 -</Text>
            </Box>
          </View>
        </View>
      ))}
    </Card>
  );
};

export default Transactions;