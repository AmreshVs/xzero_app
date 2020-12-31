import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

import SafeView from 'components/safeView';
import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import { INTRO, MAIN_SCREEN } from 'navigation/routes';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useQuery } from '@apollo/client';
import { APP_INTROS } from 'graphql/queries';
import Box from 'components/box';
import VHCenter from 'components/vhCenter';
import Spinner from 'components/spinner';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ProgressiveImage from 'components/progressiveImage';

const Intro = ({ navigation }) => {
  const { logError } = useErrorLog();
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const { data, loading, errors } = useQuery(APP_INTROS);

  if (errors) {
    ToastMsg(t('error_occured'));
    logError({
      screen: INTRO,
      module: 'Intro Screen',
      input: '',
      error: JSON.stringify(errors)
    });
  }

  useEffect(() => {
    setStorage();
  }, []);

  const setStorage = async () => {
    try {
      await AsyncStorage.setItem('@xzero_install', "true");
    }
    catch (error) {
      console.log('Set Storage Error', error);
    }
  }

  const onDone = () => {
    navigation.replace(MAIN_SCREEN);
  };

  const onSkip = () => {
    navigation.replace(MAIN_SCREEN);
  };

  const RenderItem = ({ item }) => {
    return (
      <SafeView style={styles.slide}>
        <Text style={styles.introTitleStyle}>{item?.[`title_${language}`]}</Text>
        <ProgressiveImage
          style={styles.introImageStyle}
          source={{ uri: IMAGE_URL + item?.featured_img?.url }}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.introTextStyle}>{item?.[`desc_${language}`]}</Text>
        </View>
      </SafeView>
    );
  };

  return (
    <>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <Box style={styles.container}>
        {loading ?
          (
            <VHCenter>
              <Text style={styles.introTitleStyle}>{t('welcome_to_xzero')}</Text>
              <Image style={styles.logo} source={require('../../../assets/logo.png')} />
              <Spinner />
            </VHCenter>
          )
          :
          <AppIntroSlider
            data={data?.appIntros}
            renderItem={RenderItem}
            onDone={onDone}
            showPrevButton={true}
            showSkipButton={true}
            onSkip={onSkip}
          />
        }
      </Box>
    </>
  )
}

export default memo(Intro);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
  introTextStyle: {
    color: colors.white,
    textAlign: 'center',
    paddingBottom: 50,
  },
  textContainer: {
    minHeight: 120,
    paddingHorizontal: 10
  },
  introTitleStyle: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 100,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 20
  }
});