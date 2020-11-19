import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Voucher from './voucher';
import styles from './styles';
import Box from 'components/box';

export default function Vouchers() {
  const { t } = useTranslation();

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title={t('vouchers')} gradient />
      <Box padding={10}>
        {[1, 2, 3, 4, 5].map((key, index) => <Voucher />)}
      </Box>
    </SafeView>
  );
}