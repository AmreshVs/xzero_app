import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Box from 'components/box';
import colors from 'constants/colors';
import Divider from 'components/divider';
import { MAIN_SCREEN, PROFILE_TAB_SCREEN } from 'navigation/routes';
import { getUserData, handleDOB } from 'constants/commonFunctions';
import RippleFX from 'components/rippleFx';
import styles from './styles';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';

export const handlelogout = async ({ dispatch, setUserData, logError }) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: MAIN_SCREEN }],
  });

  try {
    let removeJWTData = await AsyncStorage.removeItem('@xzero_jwt');
    let removeUserData = await AsyncStorage.removeItem('@xzero_user');
    let removePopup = await AsyncStorage.removeItem('@xzero_popup');
    if (removeJWTData === null && removeUserData === null && removePopup === null) {
      setUserData(null);
      dispatch(resetAction);
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
  const { dispatch } = useNavigation();
  const { setUserData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
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
    let userData = await getUserData();
    let userDataWithLanguage = { ...userData, language: language };
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

  return (
    <>
      <Box>
        <Row vcenter>
          <Box paddingLeft={20} flex={1}>
            <FontAwesomeIcon icon="mobile-alt" color={colors.primary} size={23} />
          </Box>
          <Box flex={8}>
            {data?.mobile_number !== 0 ? (
              <Row>
                <Text style={styles.text}>
                  {handleMobileNumber(data?.mobile_number)}
                </Text>
                <View style={styles.verifyContainer}>
                  <FontAwesomeIcon icon="certificate" color={colors.text_lite} size={25} />
                  <View style={styles.tickIcon}>
                    <FontAwesomeIcon icon="check" color={colors.white} size={10} />
                  </View>
                </View>
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

export default ProfileView;