import React, { createRef, useRef } from 'react';
import { Text, View, Animated, Image } from 'react-native';
import LottieView from 'lottie-react-native';

import Card from 'components/card';
import Button from 'components/button';
import styles from './styles';

export default function GenerateGift() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const giftTextAnim = useRef(new Animated.Value(0)).current;
  const giftRef = createRef(null);
  const confettiRef = createRef(null);

  const handleGenerate = () => {
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
            <Image source={require('../../../assets/sad.png')} style={styles.sadIcon} />
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
          <Text style={styles.giftRevealText}>Sorry! Better luck next time!</Text>
        </Animated.View>
        <View style={styles.generate}>
          <Button status="chip_1" width="50%" onPress={() => handleGenerate()}>Try your luck!</Button>
          <Text style={styles.caption}>Gifts are open every week, try your luck for the same</Text>
        </View>
      </View>
    </Card>
  )
}