import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import colors from 'constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import { firstLetterUpper, handleDOB } from 'constants/commonFunctions';

export default function UserCard({ data }) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: 'https://be.xzero.app/uploads/profile_c42b302237.jpg' }}
        style={styles.profileBg}
      /> */}
      <View style={styles.userIconContainer}>
        <FontAwesomeIcon icon="user-alt" size={25} color={colors.text_lite} />
      </View>
      <Text style={styles.username}>{firstLetterUpper(data?.username)}</Text>
      <Text style={styles.caption}>
        {t('user_since')} {data?.created_at && handleDOB(data?.created_at)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '100%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  userIconContainer: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  username: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  caption: {
    color: colors.gray,
    marginTop: 5,
  },
});
