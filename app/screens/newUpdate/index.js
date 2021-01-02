import React from 'react';
import { Text, View, Platform, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import VHCenter from 'components/vhCenter';
import Button from 'components/button';
import { BASE_URL, APP_STORE_URL, GOOGLE_PLAY_URL } from 'constants/common';
import styles from './styles';

export default function NewUpdate() {
  const { t } = useTranslation();

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(APP_STORE_URL);
      return;
    }
    Linking.openURL(GOOGLE_PLAY_URL);
  };

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title={t('new_update')} gradient leftIcon={false} />
      <VHCenter padding={10}>
        <ProgressiveImage
          style={styles.image}
          source={{ uri: BASE_URL + '/uploads/429_01_3a436570ac.png' }}
        />
        <Text style={styles.title}>{t('update_available')}</Text>
        <Text style={styles.caption}>{t('please_update')}</Text>
        <View style={styles.btnContainer}>
          <Button icon="sync" style={styles.button} onPress={() => handlePress()}>
            {t('update_now')}
          </Button>
        </View>
      </VHCenter>
    </SafeView>
  );
}