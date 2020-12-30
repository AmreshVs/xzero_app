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
import { useTranslation } from 'react-i18next';

const DrawCard = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

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
            <Text style={styles.gtitle}>{t('participate_draws')}</Text>
            <Text style={styles.gcaption}>{t('join_draw')}</Text>
            <Text style={styles.gtitle}>{t('know_more')}</Text>
          </View>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default DrawCard;