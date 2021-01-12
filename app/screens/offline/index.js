import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Button from 'components/button';
import { ToastMsg } from 'components/toastMsg';
import { HOME_SCREEN, MAIN_SCREEN } from 'navigation/routes';
import styles from './styles';

export default function Offline({ navigation, connection }) {
  const offlineRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (offlineRef.current) {
      offlineRef.current.play();
    }
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then(state => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: connection ? HOME_SCREEN : MAIN_SCREEN }],
      });

      if (state?.isInternetReachable === true) {
        navigation.dispatch(resetAction);
      }
      else {
        ToastMsg(t('device_offline_desc'));
      }
    });
  }

  return (
    <SafeView topNav={connection}>
      {connection && <TopNavigator title={t('device_offline')} leftIcon={false} gradient />}
      <View style={styles.container}>
        <LottieView
          ref={offlineRef}
          style={styles.offline}
          source={require("../../../assets/offline.json")}
          loop={true}
        />
        <Button
          width="32%"
          icon="sync-alt"
          status="chip_1"
          onPress={() => handleRetry()}
        >
          {t('retry_now')}
        </Button>
      </View>
    </SafeView>
  )
}