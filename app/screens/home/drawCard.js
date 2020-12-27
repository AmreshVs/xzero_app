import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from 'components/card';
import styles from './styles';
import Row from 'components/row';
import RippleFX from 'components/rippleFx';
import { useNavigation } from '@react-navigation/native';
import { VOUCHERS } from 'navigation/routes';

const DrawCard = () => {
  const { navigate } = useNavigation();

  return (
    <Card style={styles.referContainer}>
      <RippleFX onPress={() => navigate(VOUCHERS)}>
        <LinearGradient colors={['#FF416C', '#f80759']} style={styles.referGradient} />
        <Row style={styles.cardContent}>
          <View width="40%" paddingLeft={10}>
            <Image style={styles.cardImg} source={{ uri: 'https://be.xzero.app/v2/uploads/join_draw_61157bc97c.webp' }} />
          </View>
          <View style={styles.contentContainer} width="60%">
            <Text style={styles.gtitle}>Participate on Draws, Be a Winner everytime!</Text>
            <Text style={styles.gcaption}>Join any draw and stand a chance to win amazing prize. Unlike other draws, You will get a Product + Assured gift + A chance to be among 10+ Prize winners. So you will always win!</Text>
            <Text style={styles.gtitle}>Press to know more!</Text>
          </View>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default DrawCard;