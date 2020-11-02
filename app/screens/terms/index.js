import React from 'react';
import { useTranslation } from 'react-i18next';
import WebView from 'react-native-webview';

import TopNavigator from 'components/topNavigator';
import SafeView from 'components/safeView';
import styles from './styles';

export default function Terms({ navigation }) {
  let { t, i18n } = useTranslation();
  let language = i18n.language;

  const handleLeftClick = () => {
    navigation.toggleDrawer();
  };

  return (
    <SafeView style={styles.container}>
      <TopNavigator title={t('terms')} gradient leftIconName="bars" leftClick={handleLeftClick} />
      <WebView
        domStorageEnabled={true}
        source={{
          uri: `https://xzero.app/terms-${language}`,
        }}
        originWhitelist={['*']}
      />
    </SafeView>
  );
}