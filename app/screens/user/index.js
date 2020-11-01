import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { getShadowStyle } from 'constants/commonFunctions';
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

const User = () => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const userData = useUserData();
  const { data, loading, refetch: _refetch } = useQuery(GET_USER, {
    variables: {
      ID: Number(userData?.id),
    },
  });

  useEffect(() => {
    if (!edit) {
      _refetch();
    }
  }, [edit]);

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
          </Box>
          <Box>
            {!edit ? (
              <ProfileView data={data?.user} setEdit={setEdit} />
            ) : (
              <ProfileEdit data={data?.user} setEdit={setEdit} />
            )}
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeView>
  );
};

export default IsLoggedIn(User);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  safeView: {
    height: '100%',
    backgroundColor: colors.white,
  },
  gradient: {
    height: 240,
    width: '100%',
    position: 'absolute',
  },
  accContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...getShadowStyle(),
    top: 25,
    marginBottom: 50,
  },
  name: {
    top: 50,
    textAlign: 'center',
    width: '100%',
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  iconContainer: {
    position: 'absolute',
    top: 45,
    right: 10,
    padding: 10,
    borderRadius: 50,
    overflow: 'hidden',
    zIndex: 9,
  },
});
