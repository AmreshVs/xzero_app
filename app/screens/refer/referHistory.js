import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Divider from 'components/divider';
import { REFER_HISTORY } from 'graphql/queries';
import styles from './styles';
import { UserDataContext } from 'context';
import { getFormattedDateTime } from 'constants/commonFunctions';

export default function ReferHistory() {
  const { userData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const { data, loading } = useQuery(REFER_HISTORY, {
    variables: {
      referrer: Number(userData?.id)
    }
  });

  return (
    <View style={styles.historyContainer}>
      <Card overflow="hidden">
        <Box marginBottom={10}>
          <Text style={styles.referTitle}>{t('refer_history')}</Text>
        </Box>
        <Box loading={loading}>
          {data?.referralCodeTransactions.length > 0 ?
            data?.referralCodeTransactions.map((item, index) => (
              <View key={index}>
                {index !== 0 && <Divider />}
                <View style={styles.referContainer}>
                  <Column width="70%">
                    <Text style={styles.title} numberOfLines={1}>{item?.user?.username}</Text>
                    <Text style={styles.caption}>{getFormattedDateTime(new Date(item?.created_at))}</Text>
                  </Column>
                  <Box width="30%" alignItems="flex-end">
                    <Text style={styles.earned}>{t('aed')} {item.referrer_credit} +</Text>
                  </Box>
                </View>
              </View>
            ))
            :
            <Text style={styles.caption}>{t('no_referral_history')}</Text>
          }
        </Box>
      </Card>
    </View>
  )
}