import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

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

export default function App() {

  // Initialize Language
  useEffect(() => {
    i18nLang();

    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
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
      <Navigation />
      <ToastComponent />
    </ApolloProvider>
  );
}

// Registering Icon to use throughout the app
library.add(fas);