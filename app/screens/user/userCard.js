import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import { firstLetterUpper, handleDOB } from 'constants/commonFunctions';
import styles from './styles';

export default function UserCard({ data }) {
  const { t } = useTranslation();

  return (
    <View style={styles.userCardContainer}>
      <View style={styles.userIconContainer}>
        <FontAwesomeIcon icon="user-alt" size={25} color={colors.text_lite} />
      </View>
      <Text style={styles.username}>{firstLetterUpper(data?.username)}</Text>
      <Text style={styles.userCardCaption}>
        {t('user_since')} {data?.created_at && handleDOB(data?.created_at)}
      </Text>
    </View>
  );
}