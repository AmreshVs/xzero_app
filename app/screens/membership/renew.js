import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Button from 'components/button';
import Box from 'components/box';
import Card from 'components/card';
import { PAYMENT } from 'navigation/routes';
import styles from './styles';

export default function Renew({ membershipData, expired }) {
  const { push } = useNavigation();
  const { t } = useTranslation();

  const handleRenew = () => {
    push(PAYMENT, membershipData);
  };

  return (
    <Card style={styles.renewContainer}>
      <Text style={styles.nenewText}>
        {expired ? t('renew_expired_membership') : t('renew_membership')}
      </Text>
      <Box marginTop={10}>
        <Button icon="sync-alt" onPress={() => handleRenew()}>
          {t('renew_now')}
        </Button>
      </Box>
    </Card>
  );
}
