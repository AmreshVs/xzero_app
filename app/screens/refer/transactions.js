import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { firstLetterUpper, getFormattedDateTime } from 'constants/commonFunctions';
import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Divider from 'components/divider';
import styles from './styles';

const Transactions = ({ data, loading }) => {
  const { t } = useTranslation();

  return (
    <Card marginTop={10}>
      <Box marginBottom={5}>
        <Text style={styles.referTitle}>{t('translation')}</Text>
      </Box>
      <Box loading={loading}>
        {data && Object.keys(data).length <= 0 ? <Text style={styles.caption}>{t('no_translation')}</Text> : null}
        {data && data.map((item, index) => (
          <View key={index}>
            {index !== 0 && <Divider />}
            <View style={styles.referContainer}>
              <Column width="70%">
                <Text style={styles.title}>{firstLetterUpper(item?.withdrawal_status || ' ')}</Text>
                <Text style={styles.caption}>{getFormattedDateTime(new Date(item?.created_at))}</Text>
              </Column>
              <Box width="30%" alignItems="flex-end">
                <Text style={styles.withdrawAmt}>{t('aed')} {item?.withdraw_amount} -</Text>
              </Box>
            </View>
          </View>
        ))}
      </Box>
    </Card>
  );
};

export default Transactions;