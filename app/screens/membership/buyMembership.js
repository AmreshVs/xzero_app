import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from 'components/button';
import Box from 'components/box';
import Card from 'components/card';
import styles from './styles';

export default function BuyMembership({ handleBuy }) {
  const { t } = useTranslation();

  return (
    <Card style={styles.buyMembershipContainer}>
      <Text style={styles.buyMembershipText}>{t('no_membership')}</Text>
      <Box marginTop={10}>
        <Button icon="money-check" onPress={() => handleBuy()}>
          {t('buy_membership')}
        </Button>
      </Box>
    </Card>
  );
}