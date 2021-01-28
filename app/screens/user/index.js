import React, { useState, useEffect } from 'react';
import { Text, ScrollView, KeyboardAvoidingView, Switch, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApolloClient, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Row from 'components/row';
import colors from 'constants/colors';
import Box from 'components/box';
import SafeView from 'components/safeView';
import { getAuthenticationHeader, useReduxAction } from 'constants/commonFunctions';
import { GET_USER } from 'graphql/queries';
import IsLoggedIn from 'hoc/isLoggedIn';
import useErrorLog from 'hooks/useErrorLog';
import { PROFILE_TAB_SCREEN } from 'navigation/routes';
import { UPDATE_USER_NEW } from 'graphql/mutations';
import { SetUserData } from 'redux/actions';
import UserCard from './userCard';
import ProfileView from './profileView';
import ProfileEdit from './profileEdit';
import styles from './styles';
import { ScaleAnim } from 'animation';

const User = () => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const client = useApolloClient();
  const dispatch = useDispatch();

  const queryInput = {
    ID: Number(userData?.id),
  };

  const { data, loading, refetch: _refetch, error } = useQuery(GET_USER, {
    variables: queryInput,
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    logError({
      screen: PROFILE_TAB_SCREEN,
      module: 'Get User Profile Data',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

  const toggleSwitch = async () => {
    try {
      const enabledStatus = !isEnabled;
      setIsEnabled(previousState => !previousState);

      await client.mutate({
        mutation: UPDATE_USER_NEW,
        variables: {
          user_id: Number(userData?.id),
          data: {
            show_popup: enabledStatus
          }
        },
        ...getAuthenticationHeader(userData?.jwt)
      });

      dispatch(SetUserData({ ...userData, show_popup: enabledStatus }));
    }
    catch (error) {
      // console.log('Toggle Popup error', error);
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
      _refetch();
      dispatch(SetUserData({ ...data?.user }));
    }
  }, [edit]);

  const checkPopUp = async () => {
    setIsEnabled(userData?.show_popup);
  }

  return (
    <SafeView style={styles.safeView} loading={loading} noTop noBottom>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? -10 : -150}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <Row style={styles.topContainer} hcenter>
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2]}
              style={styles.gradient}
            />
            <UserCard edit={edit} setEdit={setEdit} data={data?.user} />
          </Row>
          <Box style={styles.safeView}>
            <Box style={styles.profileViewContainer}>
              <Box style={styles.profileView}>
                {!edit ? (
                  <ProfileView data={data?.user} setEdit={setEdit} />
                ) : (
                    <ProfileEdit data={data?.user} setEdit={setEdit} />
                  )}
                <ScaleAnim>
                  <Row style={styles.switch} vcenter>
                    <Box paddingLeft={20} marginRight={5}>
                      <Text style={styles.caption}>{t('show_popup')}</Text>
                    </Box>
                    <Switch
                      trackColor={{ false: colors.text_lite, true: colors.primary }}
                      thumbColor={colors.white}
                      ios_backgroundColor={colors.text_lite}
                      onValueChange={() => toggleSwitch()}
                      value={isEnabled}
                    />
                  </Row>
                </ScaleAnim>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView >
  );
};

export default IsLoggedIn(User);