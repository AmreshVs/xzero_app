import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Button from 'components/button';
import Box from 'components/box';
import Card from 'components/card';
import { PAYMENT } from 'navigation/routes';

export default function BuyMembership({ membershipData }) {
  const { push } = useNavigation();
  const { t } = useTranslation();

  return (
    <Card style={styles.container}>
      <Text style={styles.text}>{t('no_membership')}</Text>
      <Box marginTop={10}>
        <Button icon="money-check" onPress={() => push(PAYMENT, membershipData)}>
          {t('buy_membership')}
        </Button>
      </Box>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
  },
  text: {
    color: colors.text_lite,
  },
});
