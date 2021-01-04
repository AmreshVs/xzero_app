import React, { useContext, memo } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Divider from 'components/divider';
import { ToastMsg } from 'components/toastMsg';
import { getAuthenticationHeader, getFormattedDateTime } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import { REFER_HISTORY } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { REFER } from 'navigation/routes';
import styles from './styles';

const ReferHistory = () => {
  const { userData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const { logError } = useErrorLog();

  let queryInput = {
    referrer: Number(userData?.id)
  };

  const { data, loading, error } = useQuery(REFER_HISTORY, {
    variables: queryInput,
    ...getAuthenticationHeader(userData?.jwt)
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: REFER,
      module: '',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

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

export default memo(ReferHistory);