import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import { firstLetterUpper, handleDOB } from 'constants/commonFunctions';
import styles from './styles';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import RippleFX from 'components/rippleFx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopNavigator from 'components/topNavigator';
import { useNavigation } from '@react-navigation/native';
import ProgressiveImage from 'components/progressiveImage';

const UserCard = ({ edit, setEdit, data }) => {
  const { t } = useTranslation();
  const { userData } = useContext(UserDataContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const RightIcon = () => {
    return (
      <RippleFX style={styles.rightIconContainer} onPress={() => setEdit(!edit)}>
        <FontAwesomeIcon icon="edit" size={17} color={colors.white} />
      </RippleFX>
    );
  };

  return (
    <View style={[styles.userCardContainer, { marginTop: insets.top ? insets.top - 10 : 0 }]}>
      <TopNavigator
        title={t('profile')}
        leftIconName="bars"
        leftClick={() => navigation.toggleDrawer()}
        rightContainer={<RightIcon />}
        color="#FFF"
      />
      <View style={styles.userIconContainer}>
        {userData?.profile_pic ?
          <ProgressiveImage
            style={styles.profile_pic}
            source={{ uri: userData?.profile_pic }}
          />
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

export default memo(UserCard);