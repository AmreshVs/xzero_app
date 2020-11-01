import { Platform } from "react-native";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { API_URL, BASE_URL } from "constants/common";
import { ToastMsg } from "components/toastMsg";
import colors from "constants/colors";

const useIncomingData = {
  merge(existing = [], incoming = []) {
    return { ...incoming };
  }
}

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
    notifyOnNetworkStatusChange: true
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  uri: `${BASE_URL}/api`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: useIncomingData,
          favouritesByUser: useIncomingData,
          memberships: useIncomingData,
          notifications: useIncomingData
        }
      }
    }
  }),
  defaultOptions: defaultOptions
});

export const getNotificationToken = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      ToastMsg('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    ToastMsg('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.gradient2,
    });
  }

  return token;
}