import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Text } from 'react-native';

import colors from 'constants/colors';
import { useTranslation } from 'react-i18next';

const AppLoader = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/splash_logo.png')} style={styles.image} />
      <ActivityIndicator color={colors.primary} size={30} style={styles.spinner} />
      <Text style={styles.caption}>{t('check_updates')}</Text>
    </View>
  )
}

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors?.white,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: -70,
    marginLeft: 5
  },
  spinner: {
    backgroundColor: colors?.white,
    width: 100
  },
  caption: {
    color: colors?.text_lite
  }
});