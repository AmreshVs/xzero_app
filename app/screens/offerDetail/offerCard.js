import React from 'react';
import { Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import { BASE_URL } from 'constants/common';
import Card from 'components/card';
import styles from './styles';

const OfferCard = ({ discount }) => {
  const { t } = useTranslation();

  return (
    <Card style={styles.discountContainer}>
      <Image
        source={{
          uri: BASE_URL + '/uploads/3522051_dc4fe0d199.jpg',
        }}
        style={styles.offerBg} />
      <LinearGradient
        colors={[colors.gradient1, colors.gradient2]}
        style={styles.discountCircle}
      >
        <Text style={styles.discount}>{discount || 0}%</Text>
        <Text style={styles.discountText}>{t('discount')}</Text>
      </LinearGradient>
      <Text style={styles.caption}>{t('limited_offer')}</Text>
    </Card>
  );
};

export default OfferCard;