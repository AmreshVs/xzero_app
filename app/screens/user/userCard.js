import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import { firstLetterUpper, handleDOB } from 'constants/commonFunctions';
import styles from './styles';
import { useContext } from 'react';
import { UserDataContext } from 'context';

export default function UserCard({ data }) {
  const { t } = useTranslation();
  const { userData } = useContext(UserDataContext);

  return (
    <View style={styles.userCardContainer}>
      <View style={styles.userIconContainer}>
        {userData?.profile_pic ?
          <Image style={styles.profile_pic} source={{ uri: userData?.profile_pic }} />
          :
          <FontAwesomeIcon icon="user-alt" size={25} color={colors.text_lite} />
        }
      </View>
      <Text style={styles.username}>{firstLetterUpper(data?.username)}</Text>
      <Text style={styles.userCardCaption}>
        {t('user_since')} {data?.created_at && handleDOB(data?.created_at)}
      </Text>
    </View>
  );
}