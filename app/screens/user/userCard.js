import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import ProgressiveImage from 'components/progressiveImage';
import TopNavigator from 'components/topNavigator';
import RippleFX from 'components/rippleFx';
import colors from 'constants/colors';
import { firstLetterUpper, handleDOB, useReduxAction } from 'constants/commonFunctions';
import Icon from 'icon';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

const UserCard = ({ edit, setEdit, data }) => {
  const { t } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const RightIcon = () => {
    return (
      <View style={styles.rightIconContainer}>
        {!edit && (
          <RippleFX style={styles.rightIcon} onPress={() => setEdit(!edit)}>
            <ScaleAnim>
              <Icon name="edit" size={17} color={colors.white} wviewBox={550} />
            </ScaleAnim>
          </RippleFX>
        )}
      </View>
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
      <ScaleAnim delay={50}>
        <View style={styles.userIconContainer}>
          {userData?.profile_pic ?
            <ProgressiveImage
              style={styles.profile_pic}
              source={{ uri: userData?.profile_pic }}
            />
            :
            <Icon name="user_alt" style={styles.icon} size={25} color={colors.gradient2} />
          }
        </View>
      </ScaleAnim>
      <FadeInUpAnim delay={50}>
        <Text style={styles.username} numberOfLines={1}>{firstLetterUpper(data?.username)}</Text>
      </FadeInUpAnim>
      <FadeInUpAnim delay={150}>
        <Text style={styles.userCardCaption}>
          {t('user_since')} {data?.created_at && handleDOB(data?.created_at)}
        </Text>
      </FadeInUpAnim>
    </View>
  );
}

export default memo(UserCard);