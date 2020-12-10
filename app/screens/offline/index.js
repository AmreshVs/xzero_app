import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './styles';
import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';

export default function Offline() {
  const offlineRef = useRef(null);

  useEffect(() => {
    if (offlineRef.current) {
      offlineRef.current.play();
    }
  }, []);

  return (
    <SafeView>
      <TopNavigator title="Device Offline" gradient />
      <View style={styles.container}>
        <LottieView
          ref={offlineRef}
          style={styles.offline}
          source={require("../../../assets/offline.json")}
          loop={true}
        />
      </View>
    </SafeView>
  )
}