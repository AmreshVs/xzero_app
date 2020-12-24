import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IMAGE_URL } from 'constants/common';
import Card from 'components/card';
import ProgressiveImage from 'components/progressiveImage';
import styles from './styles';
import { smallUrl } from 'constants/commonFunctions';
import { memo } from 'react';

const SpecialistInfo = ({ specialist }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card style={styles.specialistImageContainer}>
      <ProgressiveImage
        source={{ uri: IMAGE_URL + specialist?.featured_img?.url }}
        style={styles.specialistImagebg}
        noBg />
      <ProgressiveImage
        source={{ uri: IMAGE_URL + smallUrl(specialist?.featured_img?.url) }}
        style={styles.specialistImage}
        noBg />
      <Text style={styles.title}>{specialist?.[`name_${language}`]}</Text>
      <Text style={styles.specializationCaption}>
        {specialist?.[`specialization_${language}`]}
      </Text>
    </Card>
  );
};

export default memo(SpecialistInfo);