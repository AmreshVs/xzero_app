import React from 'react';
import { Text } from 'react-native';

import Box from 'components/box';
import Row from 'components/row';
import styles from './styles';

const ViewBankInfo = () => {
  return (
    <>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>Bank Name</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>Emirates NBD</Text>
        </Box>
      </Row>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>Holder Name</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>Amresh Vs</Text>
        </Box>
      </Row>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>Account No</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>2837454738</Text>
        </Box>
      </Row>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>IBAN No</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>11234323543332</Text>
        </Box>
      </Row>
    </>
  );
};

export default ViewBankInfo;