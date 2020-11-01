import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import colors from 'constants/colors';
import Button from 'components/button';
import Box from 'components/box';
import Card from 'components/card';
import { PAYMENT } from 'navigation/routes';

export default function Renew({ membershipData, expired }) {
  const { push } = useNavigation();
  const { t } = useTranslation();

  const handleRenew = () => {
    push(PAYMENT, membershipData);
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.text}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 0,
  },
  text: {
    color: colors.danger,
  },
});
