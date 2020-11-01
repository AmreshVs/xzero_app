import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Box from 'components/box';
import colors from 'constants/colors';
import Divider from 'components/divider';
import { MAIN_SCREEN } from 'navigation/routes';
import { getUserData, handleDOB } from 'constants/commonFunctions';
import RippleFX from 'components/rippleFx';

export default function ProfileView({ data }) {
  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const { dispatch } = useNavigation();
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: MAIN_SCREEN }],
  });

  const handlelogout = async () => {
    try {
      let removeJWTData = await AsyncStorage.removeItem('@xzero_jwt');
      let removeUserData = await AsyncStorage.removeItem('@xzero_user');
      if (removeJWTData === null && removeUserData === null) {
        dispatch(resetAction);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const handleMobileNumber = (mobile_number) => {
    return String('+' + mobile_number);
  };

  const handleLangSelect = async () => {
    let lang = language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(lang);
    let userData = await getUserData();
    let userDataWithLanguage = { ...userData, language: language };
    try {
      await AsyncStorage.setItem('@xzero_user', JSON.stringify(userDataWithLanguage));
    } catch (e) {
      console.error('User Data Save', e);
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
              <Text style={styles.text}>{handleMobileNumber(data?.mobile_number)}</Text>
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
            <RippleFX onPress={() => handlelogout()}>
              <Text style={styles.logout}>{t('logout')}</Text>
            </RippleFX>
          </Box>
        </Row>
      </Box>
      <Divider margin={0} marginHorizontal={10} />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.text_dark,
    paddingVertical: 18,
  },
  logout: {
    fontSize: 16,
    color: colors.danger,
    paddingVertical: 18,
    textAlign: 'left',
  },
  caption: {
    fontSize: 16,
    paddingVertical: 18,
    color: colors.text_lite,
    textAlign: 'left',
  },
});
