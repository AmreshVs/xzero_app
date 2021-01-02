import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Card from 'components/card';
import Row from 'components/row';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import { IMAGE_URL } from 'constants/common';
import { REFER } from 'navigation/routes';
import styles from './styles';

const ReferCard = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <Card style={styles.referContainer}>
      <RippleFX onPress={() => navigate(REFER)}>
        <LinearGradient colors={['#F67062', '#FC5296']} style={styles.referGradient} />
        <Row style={styles.cardContent}>
          <View style={styles.contentContainer} width="60%">
            <Text style={styles.gtitle}>{t('free_money')}</Text>
            <Text style={styles.gcaption}>{t('refer_friends')}</Text>
            <Text style={styles.gtitle}>{t('know_more')}</Text>
          </View>
          <View width="40%" paddingRight={10}>
            <ProgressiveImage
              style={styles.cardImg}
              source={{ uri: IMAGE_URL + '/uploads/refer_friend_84ad7ba519.webp' }}
              resizeMode="contain"
            />
          </View>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default ReferCard;