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

// const slides = [
//   {
//     key: 's0',
//     text: 'Discover lots of discounts on top centers that you cannot find elsewhere. Get specialist help on-demand!, A chance to win amazing gifts every week, Participate on Draws which is completely transparent, You may be the next winner!',
//     title: 'Welcome to Xzero App!',
//     image: '/uploads/Home_Screenshot_47ef92cbbe.webp'
//   },
//   {
//     key: 's1',
//     text: 'We have membership plans which is starting from low to high cost. Buy membership plans to enjoy the desired benefits, tons of gifts, discounts on centers, draws and stand a chance to win assured gifts!',
//     title: 'Memberships',
//     image: '/uploads/Buy_Membership_Plans_Screenshot_d90bfdc6a1.webp'
//   },
//   {
//     key: 's2',
//     title: 'Apply Code to get extra discount',
//     text: 'While buying membership or draw apply referral code from your friend or promocode from xzero to get extra discounts on your purchase.',
//     image: '/uploads/Buy_Membership_Screenshot_c625302e63.webp',
//   },
//   {
//     key: 's3',
//     title: 'Membership Card',
//     text: 'After purchase, You will get an E-Membership Card, which you have to show upon visiting the centers to get the discounts on services.',
//     image: '/uploads/Membership_Screenshot_b468d6c13c.webp',
//   },
//   {
//     key: 's4',
//     title: 'Services',
//     text: 'Choose from different categories to find your desired center',
//     image: '/uploads/Home_Centers_Screenshot_02fd47312f.webp',
//   },
//   {
//     key: 's5',
//     title: 'Favorite Offers',
//     text: 'From home, Choose your category and find your desired center. Add offers to your favorites to revist later!',
//     image: '/uploads/Favorites_Screenshot_f58f190e7f.webp',
//   },
//   {
//     key: 's6',
//     title: 'Specialist Help On-Demand!',
//     text: 'We offer specialist help on-demand through whatsapp for all xzero registered users',
//     image: '/uploads/Specialists_7edf895e30.webp',
//   },
//   {
//     key: 's7',
//     title: 'Gifts Every week!',
//     text: 'We are providing of amazing gifts for every membership plans, Members can try their luck once in a week!',
//     image: '/uploads/Gifts_Screenshot_a850907985.webp',
//   },
//   {
//     key: 's8',
//     title: 'Referral Program',
//     text: 'Do you want to earn some money for free? Refer the xzero app to your friends and family members. Your friends will get some discount and you will get the discounted amount to your wallet. You can withdraw when ever you want!',
//     image: '/uploads/Referral_Screenshot_05fe9c1dcf.webp',
//   },
//   {
//     key: 's9',
//     title: 'Participate in Draws!',
//     text: 'We are conducting digital draws exclusive for xzero users, where you will buy an product, You will get that product + Assured gift + A change to win from high range of gifts!',
//     image: '/uploads/Draw_Detail_Screenshot_7f26836a36.webp',
//   },
// ];

export default function Intro({ navigation }) {
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
        <Image style={styles.introImageStyle} source={{ uri: IMAGE_URL + item?.featured_img?.url }} />
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
    width: '75%',
    height: 600,
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