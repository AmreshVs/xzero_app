import React, { useContext, useEffect, memo, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import * as Linking from 'expo-linking';

import { saveUserDataLocally } from 'screens/login/helpers';
import { ToastMsg } from 'components/toastMsg';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { BASIC_INFORMATION, GET_MEMBER_DATA } from 'graphql/queries';
import { HOME_SCREEN, INTRO, LOGIN_SCREEN, MAIN_SCREEN, NEW_UPDATE, OTP } from 'navigation/routes';
import AppLoader from 'components/appLoader';

const Main = ({ navigation }) => {
  const client = useApolloClient();
  const { setUserData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const { logError } = useErrorLog();

  useEffect(() => {
    unhideSplash();
    checkExpoUpdates();
  }, []);

  const unhideSplash = async () => {
    await SplashScreen.hideAsync();
  }

  const checkExpoUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        ToastMsg(t('updates_applied'));
        setTimeout(async () => {
          await Updates.reloadAsync();
        }, 1500);
      }
    } catch (error) {
      // console.log('Expo Updates Error', error);
      logError({
        screen: MAIN_SCREEN,
        module: 'Expo Updates',
        input: JSON.stringify(),
        error: JSON.stringify(error)
      });
    }

    await checkNewVersion();
  }

  const checkNewVersion = async () => {
    const { data, error } = await client.query({
      query: BASIC_INFORMATION,
    });

    if (error) {
      // console.log('Basic Information Error', error);
      logError({
        screen: MAIN_SCREEN,
        module: 'Basic Information',
        input: '',
        error: JSON.stringify(error)
      });
      return;
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

    await checkUser();
  };

  const checkUser = async () => {
    let jwt = null;
    let userData = null;

    jwt = await AsyncStorage.getItem('@xzero_jwt');
    userData = await AsyncStorage.getItem('@xzero_user');

    try {
      let appInstall = await AsyncStorage.getItem('@xzero_install');

      if (appInstall == "true") {

        if (userData !== null && userData !== '') {
          let loginData = JSON.parse(userData);
          if (loginData?.id) {
            const { data } = await client.query({
              query: GET_MEMBER_DATA,
              variables: {
                ID: Number(loginData?.id)
              }
            });

            if (data?.user === null || data?.user === 'null') {
              await AsyncStorage.removeItem('@xzero_jwt');
              await AsyncStorage.removeItem('@xzero_user');
              navigation.replace(LOGIN_SCREEN);
              return;
            }

            setUserData({
              jwt: JSON.parse(jwt),
              ...loginData,
              ...data?.user,
            });

            await saveUserDataLocally('xzero_user', { ...loginData, ...data?.user });

            let deepLink = await Linking.getInitialURL();
            if (deepLink && deepLink !== null && deepLink !== '' && !deepLink.includes("exp://")) {
              if (deepLink.includes("Main/")) {
                deepLink = deepLink.replace("Main/", "");
              }
              Linking.openURL(deepLink);
            }
            else {
              navigation.replace(HOME_SCREEN);
            }

            return;
          }
          else {
            navigation.replace(LOGIN_SCREEN);
            return;
          }
        }
        navigation.replace(LOGIN_SCREEN);
      }
      else {
        navigation.replace(INTRO);
      }
    } catch (error) {
      // console.log('Getting user data from async error', error);
      ToastMsg(t('error_occured'));
      logError({
        screen: MAIN_SCREEN,
        module: 'Getting Userdata and JWT from Asyncstorage',
        input: JSON.stringify({ userData, jwt }),
        error: JSON.stringify(error)
      });
    }
  };

  return <AppLoader />;
}

export default memo(Main);
