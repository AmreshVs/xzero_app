import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import { useApolloClient } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SafeView from 'components/safeView';
import colors from 'constants/colors';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import Row from 'components/row';
import ProgressiveImage from 'components/progressiveImage';
import { firstLetterUpper, useReduxAction } from 'constants/commonFunctions';
import useErrorLog from 'hooks/useErrorLog';
import { GIFTS, HOME_SCREEN, NOTIFICATIONS } from 'navigation/routes';
import { UPDATE_LANGUAGE } from 'graphql/mutations';
import Icon from 'icon';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

export const UpdateLanguage = async (client, params) => {
  try {
    let mutationInput = {
      user_id: params?.user_id,
      language: params?.language
    };

    await client.mutate({
      mutation: UPDATE_LANGUAGE,
      variables: mutationInput
    });
  }
  catch (error) {
    // console.log('Update Language Error', error);
  }
}

const TopSection = ({ notificationCount, handleModalOpen }) => {
  const { push, toggleDrawer } = useNavigation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const client = useApolloClient();

  let name = userData?.username ?? '';
  let email = userData?.email ?? '';

  const handleLangSelect = async () => {
    try {
      let originalLanguage = i18n.language;
      let language = originalLanguage === 'ar' ? 'en' : 'ar';
      await i18n.changeLanguage(language);
      let userDataWithLanguage = { ...userData, language: language };
      await AsyncStorage.setItem('@xzero_user', JSON.stringify(userDataWithLanguage));
      await UpdateLanguage(client, { user_id: userData?.id, language });
    }
    catch (error) {
      // console.log('Change Language error', error);
      logError({
        screen: HOME_SCREEN,
        module: 'Saving Change language data',
        input: '',
        error: JSON.stringify(error)
      });
    }
  };

  return (
    <>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={[styles.gradient, { height: styles.gradient.height + insets.top }]} />
      <SafeView style={styles.topSectionContainer} noBottom>
        <Box style={styles.navContainer}>
          <Row>
            <RippleFX style={styles.iconContainer} onPress={() => toggleDrawer()}>
              <ScaleAnim>
                <Icon name="bars" />
              </ScaleAnim>
            </RippleFX>
            <Box marginLeft={-13}>
              <RippleFX style={styles.iconContainer} onPress={() => push(GIFTS)}>
                <ScaleAnim>
                  <Icon name="gift" />
                </ScaleAnim>
              </RippleFX>
            </Box>
          </Row>
          <Row marginRight={10}>
            <Box marginRight={-15}>
              <RippleFX style={styles.iconContainer} onPress={() => handleModalOpen()}>
                <ScaleAnim>
                  <Icon name="search" />
                </ScaleAnim>
              </RippleFX>
            </Box>
            <RippleFX style={styles.iconContainer} onPress={() => push(NOTIFICATIONS)}>
              <ScaleAnim>
                <Icon name="bell" />
                {notificationCount > 0 ? (
                  <View style={styles.notificationCount} />
                ) : null}
              </ScaleAnim>
            </RippleFX>
            <RippleFX style={styles.iconContainer} onPress={() => handleLangSelect()}>
              <ScaleAnim>
                <Row flexWrap="nowrap" vcenter>
                  <Icon name="globe" />
                  <Text style={styles.language}>{i18n.language === 'en' ? 'AR' : 'EN'}</Text>
                </Row>
              </ScaleAnim>
            </RippleFX>
          </Row>
        </Box>
        <Box>
          <FadeInUpAnim>
            <Row hcenter vcenter>
              {userData?.profile_pic ?
                <View style={styles.imgContainer}>
                  <ScaleAnim>
                    <ProgressiveImage
                      style={styles.profile_pic}
                      thumbnailSource={{ uri: userData?.profile_pic }}
                      source={{ uri: userData?.profile_pic }}
                    />
                  </ScaleAnim>
                </View>
                :
                userData && <ScaleAnim><Icon name="user_circle" size={45} /></ScaleAnim>
              }
              {userData ?
                <View style={styles.textContiner}>
                  <Text style={styles.username} numberOfLines={1}>{firstLetterUpper(name)}</Text>
                  <Text style={styles.topCaption} numberOfLines={1}>{email}</Text>
                </View>
                :
                <View style={styles.textContiner}>
                  <Text style={styles.ntitle}>{t('get_started')}</Text>
                  <Text style={styles.topCaption}>{t('signup_note')}</Text>
                </View>
              }
            </Row>
          </FadeInUpAnim>
        </Box>
      </SafeView>
    </>
  );
};

export default memo(TopSection);