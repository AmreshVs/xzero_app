import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import ProgressiveImage from 'components/progressiveImage';
import { IMAGE_URL } from 'constants/common';
import styles from './styles';

const MembershipPlan = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card paddingBottom={15}>
      <Text style={styles.title}>{t('buy')}</Text>
      <ProgressiveImage
        source={{ uri: IMAGE_URL + data?.featured_img?.url }}
        style={styles.membershipImg}
      />
      <Text style={styles.title}>Xzero {data?.name_en} {t('membership')} - {data?.duration} {data?.duration > 1 ? t('months') : t('month')}</Text>
      <Text style={styles.caption}>{data?.desc_en}</Text>
    </Card>
  )
}

export default memo(MembershipPlan);