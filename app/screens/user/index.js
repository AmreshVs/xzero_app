import React, { useState, useEffect, useContext } from 'react';
import { Text, ScrollView, KeyboardAvoidingView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';

import Row from 'components/row';
import SafeView from 'components/safeView';
import colors from 'constants/colors';
import ProfileView from './profileView';
import ProfileEdit from './profileEdit';
import Box from 'components/box';
import { GET_USER } from 'graphql/queries';
import IsLoggedIn from 'hoc/isLoggedIn';
import UserCard from './userCard';
import styles from './styles';
import useErrorLog from 'hooks/useErrorLog';
import { UserDataContext } from 'context';
import { ToastMsg } from 'components/toastMsg';
import { PROFILE_TAB_SCREEN } from 'navigation/routes';
import { memo } from 'react';

const User = () => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();

  const queryInput = {
    ID: Number(userData?.id),
  };

  const { data, loading, refetch: _refetch, error } = useQuery(GET_USER, {
    variables: queryInput,
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: PROFILE_TAB_SCREEN,
      module: 'Get User Profile Data',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

  const toggleSwitch = async () => {
    try {
      const popupData = await AsyncStorage.getItem('@xzero_popup');
      if (popupData !== null) {
        await AsyncStorage.setItem('@xzero_popup', JSON.stringify({ status: !isEnabled }));
      }
      setIsEnabled(previousState => !previousState);
    }
    catch (error) {
      console.log('Toggle Popup error', error);
      logError({
        screen: PROFILE_TAB_SCREEN,
        module: 'Saving Popup Status',
        input: JSON.stringify(isEnabled),
        error: JSON.stringify(error)
      });
    }
  }

  useEffect(() => {
    checkPopUp();
    if (!edit) {
      // _refetch();
    }
  }, [edit]);

  const checkPopUp = async () => {
    const popupData = await AsyncStorage.getItem('@xzero_popup');
    if (popupData !== null) {
      let data = JSON.parse(popupData);
      if (data?.status !== '') {
        setIsEnabled(data?.status);
      }
    }
    else {
      await AsyncStorage.setItem('@xzero_popup', JSON.stringify({ status: true }));
    }
  }

  return (
    <>
      <Row style={styles.topContainer} hcenter>
        <LinearGradient
          colors={[colors.gradient1, colors.gradient2]}
          style={styles.gradient}
        />
        <UserCard edit={edit} setEdit={setEdit} data={data?.user} />
      </Row>
      <Box style={styles.safeView} loading={loading}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
        >
          <KeyboardAvoidingView behavior="position">
            <Box style={styles.profileViewContainer}>
              <Box style={styles.profileView}>
                {!edit ? (
                  <ProfileView data={data?.user} setEdit={setEdit} />
                ) : (
                    <ProfileEdit data={data?.user} setEdit={setEdit} />
                  )}
                <Row style={styles.switch} vcenter>
                  <Box paddingLeft={20} marginRight={5}>
                    <Text style={styles.caption}>{t('show_popup')}</Text>
                  </Box>
                  <Switch
                    trackColor={{ false: colors.text_lite, true: colors.primary }}
                    thumbColor={colors.white}
                    ios_backgroundColor={colors.text_lite}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </Row>
              </Box>
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
      </Box>
    </>
  );
};

export default IsLoggedIn(User);