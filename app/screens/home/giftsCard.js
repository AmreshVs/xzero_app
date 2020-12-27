import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from 'components/card';
import styles from './styles';
import Box from 'components/box';
import Row from 'components/row';
import RippleFX from 'components/rippleFx';
import { GIFTS } from 'navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_URL } from 'constants/common';

const GiftCard = () => {
  const { navigate } = useNavigation();

  return (
    <Card style={styles.referContainer}>
      <RippleFX onPress={() => navigate(GIFTS)}>
        <LinearGradient colors={['#CB218E', '#6617CB']} style={styles.referGradient} />
        <Row style={styles.cardContent}>
          <View width="40%" paddingLeft={10}>
            <Image style={styles.cardImg} source={{ uri: IMAGE_URL + '/uploads/weekly_gift_319079aeaa.webp' }} />
          </View>
          <View style={styles.contentContainer} width="60%">
            <Text style={styles.gtitle}>Win amazing gifts every week! Try your luck now! </Text>
            <Text style={styles.gcaption}>Gifts are open every week! Try your luck and stand a change to win gift each time!. Why wait? Unlock more gifts now!</Text>
            <Text style={styles.gtitle}>Press to know more!</Text>
          </View>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default GiftCard;