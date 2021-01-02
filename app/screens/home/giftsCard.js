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
import { GIFTS } from 'navigation/routes';
import styles from './styles';

const GiftCard = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <Card style={styles.referContainer}>
      <RippleFX onPress={() => navigate(GIFTS)}>
        <LinearGradient colors={['#CB218E', '#6617CB']} style={styles.referGradient} />
        <Row style={styles.cardContent}>
          <View width="40%" paddingLeft={10}>
            <ProgressiveImage
              style={styles.cardImg}
              source={{ uri: IMAGE_URL + '/uploads/weekly_gift_319079aeaa.webp' }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.contentContainer} width="60%">
            <Text style={styles.gtitle}>{t('win_gift')}</Text>
            <Text style={styles.gcaption}>{t('gifts_every_week')}</Text>
            <Text style={styles.gtitle}>{t('know_more')}</Text>
          </View>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default GiftCard;