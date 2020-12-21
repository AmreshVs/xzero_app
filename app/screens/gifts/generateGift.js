import React, { useContext, useRef, useState } from 'react';
import { Text, View, Animated, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Button from 'components/button';
import { GENERATE_GIFT } from 'graphql/mutations';
import { UserDataContext } from 'context';
import { IMAGE_URL, SCREEN_HEIGHT } from 'constants/common';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';
import { GIFTS } from 'navigation/routes';
import { isTab, thumbnailUrl } from 'constants/commonFunctions';

export default function GenerateGift() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const giftTextAnim = useRef(new Animated.Value(0)).current;
  const giftRef = useRef(null);
  const confettiRef = useRef(null);
  const client = useApolloClient();
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const { t } = useTranslation();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data } = await client.mutate({
        mutation: GENERATE_GIFT,
        variables: {
          user_id: Number(userData?.id)
        }
      });
      setLoading(false);
      setData(data?.GenerateGift);
      Won();
    }
    catch (error) {
      console.log('Generate Gift error', error);
      setLoading(false);
      ToastMsg(t('error_occured'));
      logError({
        screen: GIFTS,
        module: 'Generate Gift',
        input: JSON.stringify({
          user_id: Number(userData?.id)
        }),
        error: JSON.stringify(error)
      });
    }
  }

  const Won = () => {
    if (giftRef.current) {
      giftRef.current.play(0, 140);
      setTimeout(() => {
        confettiRef.current.play();
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 650,
          }
        ).start();
        Animated.timing(
          translateAnim,
          {
            toValue: -45,
            duration: 650,
          }
        ).start();
        Animated.timing(
          giftTextAnim,
          {
            toValue: isTab() ? 180 : SCREEN_HEIGHT / 14,
            duration: 650,
          }
        ).start();
      }, 2000);
    }
  }

  return (
    <Card style={styles.lottieGiftContainer}>
      <View style={styles.hideOverflow}>
        <Animated.View
          style={{
            ...styles.giftReveal,
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <View style={styles.giftRevealImage}>
            <Image source={data?.won ? { uri: IMAGE_URL + thumbnailUrl(data?.gift?.featured_img?.url) } : require('../../../assets/sad.png')} style={styles.sadIcon} />
          </View>
        </Animated.View>
        <LottieView
          ref={giftRef}
          style={styles.generateGift}
          source={require("../../../assets/gift_animation.json")}
          loop={false}
        />
        <LottieView
          ref={confettiRef}
          style={styles.confetti}
          source={require("../../../assets/confetti.json")}
          loop={false}
        />
        <Animated.View
          style={{
            ...styles.giftReveal,
            opacity: fadeAnim,
            transform: [{ translateY: giftTextAnim }],
          }}
        >
          <Text style={styles.giftRevealText}>{data?.won ? t('you_won') + data?.gift?.name_en : t('better_luck')}</Text>
        </Animated.View>
        <View style={styles.generate}>
          <Button status="chip_1" width="50%" onPress={() => handleGenerate()} loading={loading}>{t('try_your_luck')}</Button>
          <Text style={styles.caption}>{t('gifts_open')}</Text>
        </View>
      </View>
    </Card>
  )
}