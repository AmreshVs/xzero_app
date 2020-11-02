import React, { memo, useState, useEffect } from 'react';
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
import useUserData from 'hooks/useUserData';
import { firstLetterUpper, getUserData } from 'constants/commonFunctions';
import { getDeviceLang } from 'i18n';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';

const TopSection = () => {
  const [lang, setLang] = useState('en');
  const { push, toggleDrawer } = useNavigation();
  const userData = useUserData();

  const { i18n } = useTranslation();

  let name = userData?.username ?? '';
  let email = userData?.email ?? '';

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    let language = await getDeviceLang();
    setLang(language);
  };

  const handleLangSelect = async () => {
    let originalLanguage = i18n.language;
    let language = originalLanguage === 'ar' ? 'en' : 'ar';
    setLang(language);
    await i18n.changeLanguage(language);
    let userData = await getUserData();
    let userDataWithLanguage = { ...userData, language: language };
    await AsyncStorage.setItem('@xzero_user', JSON.stringify(userDataWithLanguage));
  };

  return (
    <>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <SafeView style={styles.topSectionContainer} noBottom>
        <Box style={styles.navContainer}>
          <RippleFX style={styles.iconContainer} onPress={() => toggleDrawer()}>
            <FontAwesomeIcon icon="bars" color={colors.white} size={20} />
          </RippleFX>
          <Row marginRight={10}>
            <RippleFX style={styles.iconContainer} onPress={() => push('Notifications')}>
              <FontAwesomeIcon icon="bell" color={colors.white} size={20} />
            </RippleFX>
            <RippleFX style={styles.iconContainer} onPress={() => handleLangSelect()}>
              <Row vcenter>
                <FontAwesomeIcon icon="globe" color={colors.white} size={20} />
                <Text style={styles.language}>{i18n.language === 'en' ? 'AR' : 'EN'}</Text>
              </Row>
            </RippleFX>
          </Row>
        </Box>
        <Box>
          <Row hcenter vcenter>
            <FontAwesomeIcon icon="user-circle" color={colors.white} size={45} />
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