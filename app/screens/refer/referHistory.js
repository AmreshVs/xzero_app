import React from 'react';
import { View, Text } from 'react-native';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import styles from './styles';

export default function ReferHistory() {
  return (
    <View style={styles.historyContainer}>
      <Box marginBottom={10}>
        <Text style={styles.referTitle}>Refer History</Text>
      </Box>
      {Array(20).fill(0).map((item, index) => (
        <Card style={styles.referContainer} key={index}>
          <Column width="70%">
            <Text style={styles.title} numberOfLines={1}>Amresh Vs</Text>
            <Text style={styles.caption}>{new Date().toISOString()}</Text>
          </Column>
          <Box width="30%" alignItems="flex-end">
            <Text style={styles.earned}>AED 30 +</Text>
          </Box>
        </Card>
      ))}
    </View>
  )
}