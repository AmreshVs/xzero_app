import React, { memo } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { CacheManager } from "react-native-expo-image-cache";
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { UpdateLanguage } from 'screens/home/topSection';
import Row from 'components/row';
import Box from 'components/box';
import Divider from 'components/divider';
import RippleFX from 'components/rippleFx';
import { ToastMsg } from 'components/toastMsg';
import Button from 'components/button';
import colors from 'constants/colors';
import { handleDOB, useReduxAction } from 'constants/commonFunctions';
import useErrorLog from 'hooks/useErrorLog';
import { LOGIN_SCREEN, OTP, PROFILE_TAB_SCREEN } from 'navigation/routes';
import { ClearUserData } from 'redux/actions';
import Icon from 'icon';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import { client } from '../../../helpers';
import styles from './styles';

export const handlelogout = async ({ dispatch, reduxDispatch, logError }) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: LOGIN_SCREEN }],
  });

  try {
    let removeJWTData = await AsyncStorage.removeItem('@xzero_jwt');
    let removeUserData = await AsyncStorage.removeItem('@xzero_user');

    if (removeJWTData === null && removeUserData === null) {
      await dispatch(resetAction);
      await CacheManager.clearCache();
      await client.cache.reset();
      reduxDispatch(ClearUserData());
    }
  } catch (error) {
    // console.log('Logout error', error);
    ToastMsg(t('error_occured'));
    logError({
      screen: PROFILE_TAB_SCREEN,
      module: 'Logout',
      input: '',
      error: JSON.stringify(error)
    });
  }
};

const ProfileView = ({ data, setEdit }) => {
  const { t, i18n } = useTranslation();
  const { dispatch, push } = useNavigation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const client = useApolloClient();
  const reduxDispatch = useDispatch();
  let language = i18n.language;

  const handleMobileNumber = (mobile_number) => {
    return String('+' + mobile_number);
  };

  const handlePress = () => {
    handlelogout({ dispatch, reduxDispatch, logError });
  }

  const handleLangSelect = async () => {
    let lang = language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(lang);
    let userDataWithLanguage = { ...userData, language: lang };
    UpdateLanguage(client, { user_id: userData?.id, language: lang });
    try {
      await AsyncStorage.setItem('@xzero_user', JSON.stringify(userDataWithLanguage));
    } catch (error) {
      // console.log('Change language error', error);
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
        <FadeInUpAnim>
          <Row vcenter>
            <Box paddingLeft={20} flex={1}>
              <Icon name="mobile_alt" color={colors.primary} size={23} wviewBox={300} />
            </Box>
            <Box flex={8}>
              {(data?.mobile_number !== 0 && data?.mobile_number !== null) ? (
                <Row vcenter justifyContent="space-between">
                  <Row vcenter>
                    <Text style={styles.text}>
                      {handleMobileNumber(data?.mobile_number)}
                    </Text>
                    <View style={styles.verifyContainer}>
                      <ScaleAnim delay={100}>
                        <Icon name="certificate" color={data?.confirmed ? colors.primary : colors.text_lite} size={25} />
                      </ScaleAnim>
                      <ScaleAnim delay={150} style={styles.tickIcon}>
                        <Icon name="check" color={colors.white} size={10} />
                      </ScaleAnim>
                    </View>
                  </Row>
                  {!data?.confirmed &&
                    <ScaleAnim delay={100}>
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
                    </ScaleAnim>
                  }
                </Row>
              ) : (
                  <RippleFX onPress={() => setEdit(true)}>
                    <FadeInUpAnim>
                      <Text style={styles.caption}>{t('fill_mobile')}</Text>
                    </FadeInUpAnim>
                  </RippleFX>
                )}
            </Box>
          </Row>
        </FadeInUpAnim>
      </Box>
      <FadeInUpAnim delay={100}>
        <Divider margin={0} marginHorizontal={10} />
      </FadeInUpAnim>
      <Box>
        <FadeInUpAnim delay={50}>
          <Row vcenter>
            <Box paddingLeft={20} flex={1}>
              <Icon name="at" color={colors.primary} size={23} />
            </Box>
            <Box flex={8}>
              <Text style={styles.text}>{data?.email}</Text>
            </Box>
          </Row>
        </FadeInUpAnim>
      </Box>
      <FadeInUpAnim delay={100}>
        <Divider margin={0} marginHorizontal={10} />
      </FadeInUpAnim>
      <Box>
        <FadeInUpAnim delay={100}>
          <Row vcenter>
            <Box paddingLeft={20} flex={1}>
              <Icon name="birthday_cake" color={colors.primary} size={23} wviewBox={400} />
            </Box>
            <Box flex={8}>
              {data?.birthday ? (
                <Text style={styles.text}>{handleDOB(data?.birthday)}</Text>
              ) : (
                  <RippleFX onPress={() => setEdit(true)}>
                    <Text style={styles.caption}>{t('fill_birthday')}</Text>
                  </RippleFX>
                )}
            </Box>
          </Row>
        </FadeInUpAnim>
      </Box>
      <FadeInUpAnim delay={100}>
        <Divider margin={0} marginHorizontal={10} />
      </FadeInUpAnim>
      <Box>
        <FadeInUpAnim delay={150}>
          <Row vcenter>
            <Box paddingLeft={20} flex={1}>
              <Icon name="language" color={colors.primary} size={23} wviewBox={630} />
            </Box>
            <Box flex={8}>
              <RippleFX onPress={() => handleLangSelect()}>
                <Text style={styles.text}>{language === 'en' ? 'AR' : 'EN'}</Text>
              </RippleFX>
            </Box>
          </Row>
        </FadeInUpAnim>
      </Box>
      <FadeInUpAnim delay={100}>
        <Divider margin={0} marginHorizontal={10} />
      </FadeInUpAnim>
      <Box>
        <FadeInUpAnim delay={200}>
          <Row vcenter>
            <Box paddingLeft={20} flex={1}>
              <Icon name="sign_out_alt" color={colors.danger} size={20} wviewBox={450} />
            </Box>
            <Box flex={8}>
              <RippleFX onPress={() => handlePress()}>
                <Text style={styles.logout}>{t('logout')}</Text>
              </RippleFX>
            </Box>
          </Row>
        </FadeInUpAnim>
      </Box>
      <FadeInUpAnim delay={100}>
        <Divider margin={0} marginHorizontal={10} />
      </FadeInUpAnim>
    </>
  );
}

export default memo(ProfileView);