import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

import styles from './styles';
import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Button from 'components/button';
import { HOME_SCREEN } from 'navigation/routes';
import { ToastMsg } from 'components/toastMsg';

export default function Offline({ navigation }) {
  const offlineRef = useRef(null);

  useEffect(() => {
    if (offlineRef.current) {
      offlineRef.current.play();
    }
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        navigation.navigate(HOME_SCREEN);
      }
      else {
        ToastMsg('Device Offline, Please check your internet connectivity and try again!');
      }
    });
  }

  return (
    <SafeView topNav>
      <TopNavigator title="Device Offline" leftIcon={false} gradient />
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
          Retry now
        </Button>
      </View>
    </SafeView>
  )
}