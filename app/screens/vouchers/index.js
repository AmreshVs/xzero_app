import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Voucher from './voucher';
import styles from './styles';

export default function Vouchers() {
  const { t } = useTranslation();

  return (
    <SafeView topNav>
      <TopNavigator title={t('vouchers')} gradient />
      <ScrollView contentContainerStyle={styles.vouchersScrollView} removeClippedSubviews>
        {[1, 2, 3, 4, 5].map((key, index) => <Voucher key={index} />)}
      </ScrollView>
    </SafeView>
  );
}