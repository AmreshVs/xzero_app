import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import NetInfo from "@react-native-community/netinfo";

import i18nLang from './app/i18n';
import { ToastComponent } from 'components/toastMsg';
import Navigation from 'navigation';
import { client } from './helpers';

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
    i18nLang();

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      setConnection(state.isConnected);
    });

    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      unsubscribe();
    }
  }, []);

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
      <StatusBar style="light" />
      <Navigation connection={connection} />
      <ToastComponent />
    </ApolloProvider>
  );
}

export default App;

// Registering Icon to use throughout the app
library.add(fas);