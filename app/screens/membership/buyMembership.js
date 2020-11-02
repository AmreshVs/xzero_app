import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Button from 'components/button';
import Box from 'components/box';
import Card from 'components/card';
import { PAYMENT } from 'navigation/routes';
import styles from './styles';

export default function BuyMembership({ membershipData }) {
  const { push } = useNavigation();
  const { t } = useTranslation();

  return (
    <Card style={styles.buyMembershipContainer}>
      <Text style={styles.buyMembershipText}>{t('no_membership')}</Text>
      <Box marginTop={10}>
        <Button icon="money-check" onPress={() => push(PAYMENT, membershipData)}>
          {t('buy_membership')}
        </Button>
      </Box>
    </Card>
  );
}