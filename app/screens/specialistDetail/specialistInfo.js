import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IMAGE_URL } from 'constants/common';
import Card from 'components/card';
import ProgressiveImage from 'components/progressiveImage';
import { smallUrl, thumbnailUrl } from 'constants/commonFunctions';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

const SpecialistInfo = ({ specialist }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return (
    <FadeInUpAnim>
      <Card style={styles.specialistImageContainer} shadow={false}>
        <ProgressiveImage
          source={{ uri: IMAGE_URL + specialist?.featured_img?.url }}
          style={styles.specialistImagebg}
          noBg
        />
        <ScaleAnim>
          <ProgressiveImage
            thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(specialist?.featured_img?.url) }}
            source={{ uri: IMAGE_URL + smallUrl(specialist?.featured_img?.url) }}
            style={styles.specialistImage}
            noBg
          />
        </ScaleAnim>
        <FadeInUpAnim delay={100}>
          <Text style={styles.title}>{specialist?.[`name_${language}`]}</Text>
        </FadeInUpAnim>
        <FadeInUpAnim delay={200}>
          <Text style={styles.specializationCaption}>
            {specialist?.[`specialization_${language}`]}
          </Text>
        </FadeInUpAnim>
      </Card>
    </FadeInUpAnim>
  );
};

export default memo(SpecialistInfo);