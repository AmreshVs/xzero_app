import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';

import { BASIC_INFORMATION } from 'graphql/queries';
import { HOME_SCREEN, LOGIN_SCREEN, MAIN_SCREEN, NEW_UPDATE } from 'navigation/routes';
import Loader from 'components/loader';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';

export default function Main({ navigation }) {
  const client = useApolloClient();
  const { setUserData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const { logError } = useErrorLog();

  useEffect(() => {
    checkNewVersion();
  }, []);

  const checkNewVersion = async () => {
    const { data, error } = await client.query({
      query: BASIC_INFORMATION,
    });

    if (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: MAIN_SCREEN,
        module: 'Basic Information',
        input: '',
        error: JSON.stringify(error)
      });
    }

    let appInfo = data?.appBasicInformation;

    if (Platform.OS === 'ios' && appInfo?.ios_version_check) {
      if (appInfo?.ios_app_version !== Constants.nativeAppVersion) {
        navigation.replace(NEW_UPDATE);
        return;
      }
    }

    if (Platform.OS === 'android' && appInfo?.android_version_check) {
      if (appInfo?.android_app_version !== Constants.nativeAppVersion) {
        navigation.replace(NEW_UPDATE);
        return;
      }
    }

    checkUser();
  };

  const checkUser = async () => {
    let jwt = null;
    let userData = null;
    try {
      jwt = await AsyncStorage.getItem('@xzero_jwt');
      userData = await AsyncStorage.getItem('@xzero_user');
      if (userData !== null && userData !== '') {
        let loginData = JSON.parse(userData);
        setUserData({
          jwt: JSON.parse(jwt),
          id: loginData?.id,
          email: loginData?.email,
          mobile_number: loginData?.mobile_number
        });
        navigation.replace(HOME_SCREEN);
        return;
      }
      navigation.replace(LOGIN_SCREEN);
    } catch (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: MAIN_SCREEN,
        module: 'Getting Userdata and JWT from Asyncstorage',
        input: JSON.stringify({ userData, jwt }),
        error: JSON.stringify(error)
      });
    }
  };

  return <Loader />;
}
