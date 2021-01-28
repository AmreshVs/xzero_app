import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox, Platform, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";

import i18nLang from './app/i18n';
import { ToastComponent } from 'components/toastMsg';
import Navigation from 'navigation';
import { client } from './helpers';
import Offline from 'screens/offline';
import store from 'redux/store';

SplashScreen.preventAutoHideAsync();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified.',
]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const [connection, setConnection] = useState(true);
  let unsubscribe = null

  // Initialize Language
  useEffect(() => {
    checkInternet();

    initializeLanguage();

    unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state?.isInternetReachable !== null ? state?.isInternetReachable : state?.isConnected);
    });

    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      if (unsubscribe !== null) {
        unsubscribe();
      }
    }
  }, []);

  const initializeLanguage = async () => {
    await i18nLang();
  }

  const checkInternet = async () => {
    const state = await NetInfo.fetch();
    setConnection(state?.isInternetReachable !== null ? state?.isInternetReachable : state?.isConnected);
  }

  const handleNotification = (notification) => {
    let responseData = notification?.request?.content?.data;
    if (responseData?.type === 'appLink') {
      Linking.openURL(responseData?.link);
    }
  }

  const handleNotificationResponse = (response) => {
    let responseData = response?.notification?.request?.content?.data;
    if (responseData?.type === 'appLink') {
      Linking.openURL(responseData?.link);
    }
  }

  const unhideSplash = async () => {
    await SplashScreen.hideAsync();
  }

  if (connection) {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SafeAreaProvider>
            <StatusBar hidden={Platform.OS === 'android'} style="light" />
            <Navigation connection={connection} />
            <ToastComponent />
          </SafeAreaProvider>
        </Provider>
      </ApolloProvider>
    )
  }
  else {
    unhideSplash();
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Offline connection={false} />
        <ToastComponent />
      </SafeAreaProvider>
    )
  }
}

export default App;