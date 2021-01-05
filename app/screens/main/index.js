import React, { useContext, useEffect, memo } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';

import { saveUserDataLocally } from 'screens/login/helpers';
import Loader from 'components/loader';
import { ToastMsg } from 'components/toastMsg';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { BASIC_INFORMATION, GET_MEMBER_DATA } from 'graphql/queries';
import { EXPO_UPDATE, HOME_SCREEN, INTRO, LOGIN_SCREEN, MAIN_SCREEN, NEW_UPDATE, OTP } from 'navigation/routes';

const Main = ({ navigation }) => {
  const client = useApolloClient();
  const { setUserData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const { logError } = useErrorLog();

  useEffect(() => {
    checkNewVersion();
  }, []);

  const checkExpoUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        navigation.replace(EXPO_UPDATE);
        return false;
      }
      return true;
    } catch (error) {
      console.log('Expo Updates Error', error);
      logError({
        screen: MAIN_SCREEN,
        module: 'Expo Updates',
        input: JSON.stringify(),
        error: JSON.stringify(error)
      });
      return true;
    }
  }

  const checkNewVersion = async () => {
    const { data, error } = await client.query({
      query: BASIC_INFORMATION,
    });

    if (error) {
      console.log('Basic Information Error', error);
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

    if (await checkExpoUpdates()) {
      await checkUser();
      await SplashScreen.hideAsync();
    }
  };

  const checkUser = async () => {
    try {
      let appInstall = await AsyncStorage.getItem('@xzero_install');

      if (appInstall == "true") {
        let jwt = null;
        let userData = null;

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

            if (data?.user?.confirmed || data?.user?.provider !== 'local') {
              await saveUserDataLocally('xzero_user', { ...loginData, ...data?.user });
              navigation.replace(HOME_SCREEN);
            }
            else {
              navigation.replace(OTP, {
                user_id: data?.user?.id,
                mobile_number: data?.user?.mobile_number
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
      }
      else {
        navigation.replace(INTRO);
      }
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

export default memo(Main);