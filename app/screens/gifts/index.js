import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import { BASE_URL } from 'constants/common';
import TopNavigator from 'components/topNavigator';
import ProgressiveImage from 'components/progressiveImage';
import VHCenter from 'components/vhCenter';
import styles from './styles';

export default function Gifts() {
  const { t } = useTranslation();

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title={t('gifts')} gradient />
      <VHCenter padding={10}>
        <ProgressiveImage
          source={{ uri: BASE_URL + '/uploads/gift_edb46f51a6.jpg' }}
          style={styles.image}
        />
        <Text style={styles.title}>{t('working_on_gifts_title')}</Text>
        <Text style={styles.caption}>{t('working_on_gifts_desc')}</Text>
      </VHCenter>
    </SafeView>
  );
}