import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import { firstLetterUpper, handleDOB } from 'constants/commonFunctions';
import styles from './styles';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import SafeView from 'components/safeView';
import RippleFX from 'components/rippleFx';

export default function UserCard({ edit, data }) {
  const { t } = useTranslation();
  const { userData } = useContext(UserDataContext);

  return (
    <SafeView style={styles.userCardContainer}>
      <Text style={styles.name}>{t('profile')}</Text>
      {!edit && (
        <RippleFX style={styles.iconContainer} onPress={() => setEdit(!edit)}>
          <FontAwesomeIcon icon="edit" size={17} color={colors.white} />
        </RippleFX>
      )}
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
    </SafeView>
  );
}