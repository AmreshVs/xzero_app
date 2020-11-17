import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import AvailableGifts from './availableGifts';
import AvailedGifts from './availedGifts';
import GenerateGift from './generateGift';

export default function Gifts() {
  const { t } = useTranslation();

  return (
    <SafeView topNav>
      <TopNavigator title={t('gifts')} gradient />
      <ScrollView>
        <GenerateGift />
        <AvailableGifts />
        <AvailedGifts />
      </ScrollView>
    </SafeView>
  );
}