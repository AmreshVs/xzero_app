import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Row from 'components/row';
import styles from './styles';

const ViewBankInfo = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>{t('bank_name')}</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>{data?.bank_name}</Text>
        </Box>
      </Row>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>{t('holder_name')}</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>{data?.holder_name}</Text>
        </Box>
      </Row>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>{t('account_no')}</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>{data?.account_number}</Text>
        </Box>
      </Row>
      <Row marginBottom={3}>
        <Box width="40%">
          <Text style={styles.title}>{t('iban_no')}</Text>
        </Box>
        <Box width="60%">
          <Text style={styles.caption}>{data?.iban}</Text>
        </Box>
      </Row>
    </>
  );
};

export default ViewBankInfo;