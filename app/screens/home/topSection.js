import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import colors from 'constants/colors';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import Row from 'components/row';
import { firstLetterUpper } from 'constants/commonFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import { GIFTS, HOME_SCREEN, NOTIFICATIONS } from 'navigation/routes';
import styles from './styles';
import useErrorLog from 'hooks/useErrorLog';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProgressiveImage from 'components/progressiveImage';
import { useApolloClient } from '@apollo/client';
import { UPDATE_LANGUAGE } from 'graphql/mutations';

export const UpdateLanguage = async (client, params) => {
  try {
    await client.mutate({
      mutation: UPDATE_LANGUAGE,
      variables: {
        user_id: params?.user_id,
        language: params?.language
      }
    });
  }
  catch (error) {
    console.log('Update Language Error', error);
  }
}

const TopSection = ({ handleModalOpen }) => {
  const { push, toggleDrawer } = useNavigation();
  const { userData } = useContext(UserDataContext);
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
      console.log('Change Language error', error);
      ToastMsg(t('error_occured'));
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
              <FontAwesomeIcon icon="bars" color={colors.white} size={20} />
            </RippleFX>
            <Box marginLeft={-13}>
              <RippleFX style={styles.iconContainer} onPress={() => push(GIFTS)}>
                <FontAwesomeIcon icon="gift" color={colors.white} size={20} />
              </RippleFX>
            </Box>
          </Row>
          <Row marginRight={10}>
            <Box marginRight={-15}>
              <RippleFX style={styles.iconContainer} onPress={() => handleModalOpen()}>
                <FontAwesomeIcon icon="search" color={colors.white} size={20} />
              </RippleFX>
            </Box>
            <RippleFX style={styles.iconContainer} onPress={() => push(NOTIFICATIONS)}>
              <FontAwesomeIcon icon="bell" color={colors.white} size={20} />
            </RippleFX>
            <RippleFX style={styles.iconContainer} onPress={() => handleLangSelect()}>
              <Row flexWrap="nowrap" vcenter>
                <FontAwesomeIcon icon="globe" color={colors.white} size={20} />
                <Text style={styles.language}>{i18n.language === 'en' ? 'AR' : 'EN'}</Text>
              </Row>
            </RippleFX>
          </Row>
        </Box>
        <Box>
          <Row hcenter vcenter>
            {userData?.profile_pic ?
              <View style={styles.imgContainer}>
                <ProgressiveImage
                  style={styles.profile_pic}
                  thumbnailSource={{ uri: userData?.profile_pic }}
                  source={{ uri: userData?.profile_pic }}
                />
              </View>
              :
              <FontAwesomeIcon icon="user-circle" color={colors.white} size={45} />
            }
            <View style={styles.textContiner}>
              <Text style={styles.username}>{firstLetterUpper(name)}</Text>
              <Text style={styles.topCaption}>{email}</Text>
            </View>
          </Row>
        </Box>
      </SafeView>
    </>
  );
};

export default memo(TopSection);