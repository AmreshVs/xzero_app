import { Platform } from "react-native";
import { InMemoryCache, ApolloClient, HttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { BASE_URL } from "constants/common";
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
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, extensions }) => {
      // console.log(
      //   `[GraphQL error]: Message: ${message}, Location: ${extensions.code}`
      // );
    });
  if (networkError) {
    // console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: `${BASE_URL}/api`
});

export const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: useIncomingData,
          favouritesByUser: useIncomingData,
          memberships: useIncomingData,
          notifications: useIncomingData,
          voucherAvaileds: useIncomingData,
          UsersPermissionsUser: useIncomingData,
          GetReferHistory: useIncomingData,
          Vouchers: useIncomingData,
          assured_gift: useIncomingData
        }
      }
    }
  }),
  defaultOptions: defaultOptions,
});

export const getNotificationToken = async () => {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.gradient2,
      sound: true,
    });
  }

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
    return (await Notifications.getExpoPushTokenAsync({ experienceId: '@xzero/Xzero' })).data;
  } else {
    ToastMsg('Must use physical device for Push Notifications');
  }
}