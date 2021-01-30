import React, { memo } from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import ProgressiveImage from 'components/progressiveImage';
import { BASE_URL } from 'constants/common';
import { smallUrl } from 'constants/commonFunctions';
import colors from 'constants/colors';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

const OfferCard = ({ discount }) => {
  const { t } = useTranslation();

  return (
    <FadeInUpAnim>
      <Card style={styles.discountContainer} shadow={false}>
        <ProgressiveImage
          style={styles.offerBg}
          source={{ uri: BASE_URL + smallUrl('/uploads/3522051_dc4fe0d199.jpg') }}
        />
        <ScaleAnim>
          <LinearGradient
            colors={[colors.gradient1, colors.gradient2]}
            style={styles.discountCircle}
          >
            <Text style={styles.discount}>{discount || 0}%</Text>
            <Text style={styles.discountText}>{t('discount')}</Text>
          </LinearGradient>
        </ScaleAnim>
        <Text style={styles.caption}>{t('limited_offer')}</Text>
      </Card>
    </FadeInUpAnim>
  );
};

export default memo(OfferCard);