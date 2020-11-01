import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import { BASE_URL } from 'constants/common';
import colors from 'constants/colors';
import TopNavigator from 'components/topNavigator';
import ProgressiveImage from 'components/progressiveImage';
import VHCenter from 'components/vhCenter';

export default function Vouchers() {
  const { t } = useTranslation();

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title={t('vouchers')} gradient />
      <VHCenter padding={10}>
        <ProgressiveImage
          source={{ uri: BASE_URL + '/uploads/vouchers_2cb3c38e63.jpg' }}
          style={styles.image}
        />
        <Text style={styles.title}>{t('working_on_vouchers_title')}</Text>
        <Text style={styles.caption}>{t('working_on_vouchers_desc')}</Text>
      </VHCenter>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: -30,
  },
  title: {
    color: colors.text_dark,
    fontWeight: '700',
    fontSize: 16,
  },
  caption: {
    color: colors.text_lite,
    marginTop: 5,
    textAlign: 'center',
  },
});
