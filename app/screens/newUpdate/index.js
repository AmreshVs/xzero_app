import React from 'react';
import { StyleSheet, Text, Image, View, Platform, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import { BASE_URL } from 'constants/common';
import colors from 'constants/colors';
import TopNavigator from 'components/topNavigator';
import VHCenter from 'components/vhCenter';
import Button from 'components/button';

export default function NewUpdate() {
  const { t } = useTranslation();

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/ae/app/xzeroo/id1526109721');
      return;
    }
    Linking.openURL('https://play.google.com/store/apps/details?id=com.media.xzero');
  };

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title={t('new_update')} gradient leftIcon={false} />
      <VHCenter padding={10}>
        <Image source={{ uri: BASE_URL + '/uploads/429_01_3a436570ac.png' }} style={styles.image} />
        <Text style={styles.title}>{'New update available!'}</Text>
        <Text style={styles.caption}>
          {
            'There is an new version of the app available. Please update to get the latest features and bug fixes'
          }
        </Text>
        <View style={styles.btnContainer}>
          <Button icon="sync" style={styles.button} onPress={() => handlePress()}>
            {t('update_now')}
          </Button>
        </View>
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
    width: 300,
    height: 300,
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
  button: {
    paddingHorizontal: 30,
  },
  btnContainer: {
    marginTop: 10,
  },
});
