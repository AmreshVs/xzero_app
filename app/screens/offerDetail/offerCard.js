import React, { memo } from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import ProgressiveImage from 'components/progressiveImage';
import { BASE_URL } from 'constants/common';
import colors from 'constants/colors';
import styles from './styles';
import { smallUrl } from 'constants/commonFunctions';

const OfferCard = ({ discount }) => {
  const { t } = useTranslation();

  return (
    <Card style={styles.discountContainer}>
      <ProgressiveImage
        style={styles.offerBg}
        source={{ uri: BASE_URL + smallUrl('/uploads/3522051_dc4fe0d199.jpg') }}
      />
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

export default memo(OfferCard);