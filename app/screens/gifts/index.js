import React from 'react';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import AvailableGifts from './availableGifts';
import AvailedGifts from './availedGifts';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

export default function Gifts() {
  const { t } = useTranslation();

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title={t('gifts')} gradient />
      <ScrollView removeClippedSubviews={true}>
        <AvailableGifts />
        <AvailedGifts />
      </ScrollView>
    </SafeView>
  );
}