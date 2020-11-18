import React, { createRef, useContext, useRef, useState } from 'react';
import { Text, View, Animated, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useApolloClient } from '@apollo/client';

import Card from 'components/card';
import Button from 'components/button';
import styles from './styles';
import { GENERATE_GIFT } from 'graphql/mutations';
import { UserDataContext } from 'context';
import { IMAGE_URL } from 'constants/common';

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

  const handleGenerate = async () => {
    setLoading(true);
    const { data } = await client.mutate({
      mutation: GENERATE_GIFT,
      variables: {
        user_id: Number(userData?.id)
      }
    });
    console.log(data);
    setLoading(false);
    setData(data?.GenerateGift);
    Won(data?.GenerateGift?.won);
  }

  const Won = (status) => {
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
            toValue: 70,
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
            <Image source={data?.won ? { uri: IMAGE_URL + data?.gift?.featured_img?.url } : require('../../../assets/sad.png')} style={styles.sadIcon} />
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
          <Text style={styles.giftRevealText}>{data?.won ? data?.gift?.name_en : 'Sorry! Better luck next time!'}</Text>
        </Animated.View>
        <View style={styles.generate}>
          <Button status="chip_1" width="50%" onPress={() => handleGenerate()} loading={loading}>Try your luck!</Button>
          <Text style={styles.caption}>Gifts are open every week, try your luck for the same</Text>
        </View>
      </View>
    </Card>
  )
}