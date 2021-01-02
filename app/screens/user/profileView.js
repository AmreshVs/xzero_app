import React, { useContext, memo } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { CacheManager } from "react-native-expo-image-cache";
import { useApolloClient } from '@apollo/client';

import { UpdateLanguage } from 'screens/home/topSection';
import Row from 'components/row';
import Box from 'components/box';
import Divider from 'components/divider';
import RippleFX from 'components/rippleFx';
import { ToastMsg } from 'components/toastMsg';
import Button from 'components/button';
import colors from 'constants/colors';
import { handleDOB } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { MAIN_SCREEN, OTP, PROFILE_TAB_SCREEN } from 'navigation/routes';
import styles from './styles';

export const handlelogout = async ({ dispatch, setUserData, logError }) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: MAIN_SCREEN }],
  });

  try {
    let removeJWTData = await AsyncStorage.removeItem('@xzero_jwt');
    let removeUserData = await AsyncStorage.removeItem('@xzero_user');

    if (removeJWTData === null && removeUserData === null) {
      await CacheManager.clearCache();
      dispatch(resetAction);
      setUserData(null);
    }
  } catch (error) {
    console.log('Logout error', error);
    ToastMsg(t('error_occured'));
    logError({
      screen: PROFILE_TAB_SCREEN,
      module: 'Logout',
      input: '',
      error: JSON.stringify(error)
    });
  }
};

const ProfileView = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { dispatch, push } = useNavigation();
  const { userData, setUserData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const client = useApolloClient();
  let language = i18n.language;

  const handleMobileNumber = (mobile_number) => {
    return String('+' + mobile_number);
  };

  const handlePress = () => {
    handlelogout({ dispatch, setUserData, logError });
  }

  const handleLangSelect = async () => {
    let lang = language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(lang);
    let userDataWithLanguage = { ...userData, language: lang };
    UpdateLanguage(client, { user_id: userData?.id, language: lang });
    try {
      await AsyncStorage.setItem('@xzero_user', JSON.stringify(userDataWithLanguage));
    } catch (error) {
      console.log('Change language error', error);
      logError({
        screen: PROFILE_TAB_SCREEN,
        module: 'Change Language',
        input: JSON.stringify(userDataWithLanguage),
        error: JSON.stringify(error)
      });
    }
  };

  const handleVerify = () => {
    push(OTP, {
      user_id: userData?.id,
      mobile_number: data?.mobile_number
    });
  }

  return (
    <>
      <Box marginTop={10}>
        <Row vcenter>
          <Box paddingLeft={20} flex={1}>
            <FontAwesomeIcon icon="mobile-alt" color={colors.primary} size={23} />
          </Box>
          <Box flex={8}>
            {data?.mobile_number !== 0 ? (
              <Row vcenter justifyContent="space-between">
                <Row vcenter>
                  <Text style={styles.text}>
                    {handleMobileNumber(data?.mobile_number)}
                  </Text>
                  <View style={styles.verifyContainer}>
                    <FontAwesomeIcon icon="certificate" color={userData?.confirmed ? colors.primary : colors.text_lite} size={25} />
                    <View style={styles.tickIcon}>
                      <FontAwesomeIcon icon="check" color={colors.white} size={10} />
                    </View>
                  </View>
                </Row>
                {!userData?.confirmed &&
                  <Box marginRight={20}>
                    <Button
                      size="small"
                      icon="check"
                      status="chip_1"
                      onPress={() => handleVerify()}
                    >
                      {t('verify_now')}
                    </Button>
                  </Box>
                }
              </Row>
            ) : (
                <Text style={styles.caption}>{t('fill_mobile')}</Text>
              )}
          </Box>
        </Row>
      </Box>
      <Divider margin={0} marginHorizontal={10} />
      <Box>
        <Row vcenter>
          <Box paddingLeft={20} flex={1}>
            <FontAwesomeIcon icon="at" color={colors.primary} size={23} />
          </Box>
          <Box flex={8}>
            <Text style={styles.text}>{data?.email}</Text>
          </Box>
        </Row>
      </Box>
      <Divider margin={0} marginHorizontal={10} />
      <Box>
        <Row vcenter>
          <Box paddingLeft={20} flex={1}>
            <FontAwesomeIcon icon="birthday-cake" color={colors.primary} size={23} />
          </Box>
          <Box flex={8}>
            {data?.birthday ? (
              <Text style={styles.text}>{handleDOB(data?.birthday)}</Text>
            ) : (
                <Text style={styles.caption}>{t('fill_birthday')}</Text>
              )}
          </Box>
        </Row>
      </Box>
      <Divider margin={0} marginHorizontal={10} />
      <Box>
        <Row vcenter>
          <Box paddingLeft={20} flex={1}>
            <FontAwesomeIcon icon="language" color={colors.primary} size={23} />
          </Box>
          <Box flex={8}>
            <RippleFX onPress={() => handleLangSelect()}>
              <Text style={styles.text}>{language === 'en' ? 'AR' : 'EN'}</Text>
            </RippleFX>
          </Box>
        </Row>
      </Box>
      <Divider margin={0} marginHorizontal={10} />
      <Box>
        <Row vcenter>
          <Box paddingLeft={20} flex={1}>
            <FontAwesomeIcon icon="sign-out-alt" color={colors.danger} size={23} />
          </Box>
          <Box flex={8}>
            <RippleFX onPress={() => handlePress()}>
              <Text style={styles.logout}>{t('logout')}</Text>
            </RippleFX>
          </Box>
        </Row>
      </Box>
      <Divider margin={0} marginHorizontal={10} />
    </>
  );
}

export default memo(ProfileView);