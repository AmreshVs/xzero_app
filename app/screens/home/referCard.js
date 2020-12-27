import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from 'components/card';
import styles from './styles';
import Box from 'components/box';
import Row from 'components/row';
import { useNavigation } from '@react-navigation/native';
import RippleFX from 'components/rippleFx';
import { REFER } from 'navigation/routes';

const ReferCard = () => {
  const { navigate } = useNavigation();

  return (
    <Card style={styles.referContainer}>
      <RippleFX onPress={() => navigate(REFER)}>
        <LinearGradient colors={['#F67062', '#FC5296']} style={styles.referGradient} />
        <Row style={styles.cardContent}>
          <View style={styles.contentContainer} width="60%">
            <Text style={styles.gtitle}>Do you know how to make money for free?</Text>
            <Text style={styles.gcaption}>Refer your friends or family friends to Xzero app by sharing your referral code! Earn more cash and win amazing gifts!</Text>
            <Text style={styles.gtitle}>Press to know more!</Text>
          </View>
          <View width="40%" paddingRight={10}>
            <Image style={styles.cardImg} source={{ uri: 'https://be.xzero.app/v2/uploads/refer_friend_84ad7ba519.webp' }} />
          </View>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default ReferCard;