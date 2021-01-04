import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Updates from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import VHCenter from 'components/vhCenter';
import ProgressiveImage from 'components/progressiveImage';
import Spinner from 'components/spinner';
import { ToastMsg } from 'components/toastMsg';
import { BASE_URL } from 'constants/common';
import colors from 'constants/colors';
import styles from './styles';

export default function ExpoUpdate() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    downloadUpdate();
  }, []);

  const downloadUpdate = async () => {
    await SplashScreen.hideAsync();
    await Updates.fetchUpdateAsync();
    ToastMsg('Finished updating! App will restart now');
    setLoading(false);
    setTimeout(() => {
      Updates.reloadAsync();
    }, 1500);
  }

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title={t('checking_update')} gradient leftIcon={false} />
      <VHCenter padding={10}>
        <ProgressiveImage
          style={styles.image}
          source={{ uri: BASE_URL + '/uploads/expo_update_a6850d4917.webp' }}
        />
        <Spinner color={loading ? colors?.primary : colors.white} />
        <Text style={styles.title}>{t('downloading_update')}</Text>
        <Text style={styles.caption}>{t('restart_app')}</Text>
      </VHCenter>
    </SafeView>
  );
}