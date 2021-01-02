import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from 'components/button';
import Box from 'components/box';
import Card from 'components/card';
import styles from './styles';

const BuyMembership = ({ handleBuy }) => {
  const { t } = useTranslation();

  return (
    <Card style={styles.buyMembershipContainer}>
      <Text style={styles.about}>
        {t('buy_now')}
      </Text>
      <Text style={styles.helpCaption}>{t('no_membership')}</Text>
      <Box>
        <Button icon="money-check" onPress={() => handleBuy()}>
          {t('buy_membership')}
        </Button>
      </Box>
    </Card>
  );
}

export default memo(BuyMembership);