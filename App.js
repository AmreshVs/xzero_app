import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox, Platform, Text } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import i18nLang from './app/i18n';
import { ToastComponent } from 'components/toastMsg';
import Navigation from 'navigation';
import { client } from './helpers';

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

  // Initialize Language
  useEffect(() => {
    checkInternet();

    i18nLang();

    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state?.isInternetReachable);
    });

    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);


    return () => {
      unsubscribe();
    }
  }, []);

  const checkInternet = async () => {
    const state = await NetInfo.fetch();
    setConnection(state?.isInternetReachable);
  }

  const handleNotification = (notification) => {
    const responseData = notification?.request?.content?.data;
    if (responseData?.type === 'appLink') {
      Linking.openURL(responseData?.link);
    }
  }

  const handleNotificationResponse = (response) => {
    const responseData = response?.notification?.request?.content?.data;
    if (responseData?.type === 'appLink') {
      Linking.openURL(responseData?.link);
    }
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <StatusBar hidden={Platform.OS === 'android'} style="light" />
        <Navigation connection={connection} />
        <ToastComponent />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;

// Registering Icon to use throughout the app
library.add(fas);