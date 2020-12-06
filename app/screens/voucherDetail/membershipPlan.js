import React from 'react';
import { Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import { IMAGE_URL } from 'constants/common';
import styles from './styles';

export default function MembershipPlan({ data }) {
  const { t } = useTranslation();

  return (
    <Card paddingBottom={15}>
      <Image source={{ uri: IMAGE_URL + data?.featured_img?.url }} style={styles.membershipImg} />
      <Text style={styles.title}>Xzero {data?.name_en} {t('membership')}</Text>
      <Text style={styles.caption}>{`${t('enjoy_all_benefits')} 1 Year`}</Text>
    </Card>
  )
}