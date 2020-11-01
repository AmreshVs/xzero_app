import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';

import i18nLang from './app/i18n';
import { ToastComponent } from 'components/toastMsg';
import Navigation from 'navigation';
import { client } from './helpers';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified.',
]);

export default function App() {

  // Initialize Language
  useEffect(() => {
    i18nLang();
  }, []);

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