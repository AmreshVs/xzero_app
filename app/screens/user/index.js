import React, { useState, useEffect } from 'react';
import { Text, ScrollView, KeyboardAvoidingView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';

import Row from 'components/row';
import SafeView from 'components/safeView';
import colors from 'constants/colors';
import ProfileView from './profileView';
import ProfileEdit from './profileEdit';
import Box from 'components/box';
import useUserData from 'hooks/useUserData';
import { GET_USER } from 'graphql/queries';
import IsLoggedIn from 'hoc/isLoggedIn';
import UserCard from './userCard';
import RippleFX from 'components/rippleFx';
import styles from './styles';

const User = () => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const userData = useUserData();
  const { data, loading, refetch: _refetch } = useQuery(GET_USER, {
    variables: {
      ID: Number(userData?.id),
    },
  });

  const toggleSwitch = async () => {
    const popupData = await AsyncStorage.getItem('@xzero_popup');
    if (popupData !== null) {
      await AsyncStorage.setItem('@xzero_popup', JSON.stringify({ status: !isEnabled }));
    }
    setIsEnabled(previousState => !previousState);
  }

  useEffect(() => {
    checkPopUp();
    if (!edit) {
      _refetch();
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
    <SafeView style={styles.safeView} loading={loading} noTop noBottom>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
        <KeyboardAvoidingView behavior="position">
          <Box>
            <Row hcenter>
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                style={styles.gradient}
              />
            </Row>
            <Text style={styles.name}>{t('profile')}</Text>
            {!edit && (
              <RippleFX style={styles.iconContainer} onPress={() => setEdit(!edit)}>
                <FontAwesomeIcon icon="edit" size={17} color={colors.white} />
              </RippleFX>
            )}
            <Row padding={10} hcenter>
              <UserCard data={data?.user} />
            </Row>
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
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeView>
  );
};

export default IsLoggedIn(User);