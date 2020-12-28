import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressiveImage from 'components/progressiveImage';

import Card from 'components/card';
import styles from './styles';
import Row from 'components/row';
import RippleFX from 'components/rippleFx';
import { useNavigation } from '@react-navigation/native';
import { VOUCHERS } from 'navigation/routes';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl } from 'constants/commonFunctions';

const DrawCard = () => {
  const { navigate } = useNavigation();

  return (
    <Card style={styles.referContainer}>
      <RippleFX onPress={() => navigate(VOUCHERS)}>
        <LinearGradient colors={['#FF416C', '#f80759']} style={styles.referGradient} />
        <Row style={styles.cardContent}>
          <View width="40%" paddingLeft={10}>
            <ProgressiveImage
              style={styles.cardImg}
              source={{ uri: IMAGE_URL + '/uploads/join_draw_61157bc97c.webp' }}
              resizeMode="contain"
            />
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