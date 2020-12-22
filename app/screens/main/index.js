import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';

import { BASIC_INFORMATION, GET_MEMBER_DATA } from 'graphql/queries';
import { HOME_SCREEN, LOGIN_SCREEN, MAIN_SCREEN, NEW_UPDATE, OTP } from 'navigation/routes';
import Loader from 'components/loader';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';

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
        if (loginData?.id) {
          const { data } = await client.query({
            query: GET_MEMBER_DATA,
            variables: {
              ID: Number(loginData?.id)
            }
          });

          setUserData({
            jwt: JSON.parse(jwt),
            ...loginData,
            ...data?.user,
          });

          if (loginData?.confirmed || loginData?.provider !== 'local') {
            navigation.replace(HOME_SCREEN);
          }
          else {
            navigation.replace(OTP, {
              user_id: loginData?.id,
              mobile_number: loginData?.mobile_number
            });
          }
          return;
        }
        else {
          navigation.replace(LOGIN_SCREEN);
          return;
        }
      }
      navigation.replace(LOGIN_SCREEN);
    } catch (error) {
      console.log('Getting user data from async error', error);
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
