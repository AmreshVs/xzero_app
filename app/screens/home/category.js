import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import { CENTERS_SCREEN, SPECIALIST_HELP } from 'navigation/routes';
import { IMAGE_URL } from 'constants/common';
import ProgressiveImage from 'components/progressiveImage';
import styles from './styles';
import { memo } from 'react';
import { smallUrl } from 'constants/commonFunctions';

const Category = ({ data }) => {
  if (data?.centersCount <= 0) {
    return null;
  }

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const navigateToCenters = () => {
    if (data?.type === 'specialist') {
      navigation.push(SPECIALIST_HELP, {
        id: data?.id,
        title: data?.[`title_${language}`],
      });
      return;
    }

    navigation.push(CENTERS_SCREEN, {
      id: data?.id,
      title: data?.[`title_${language}`],
    });
  };

  return (
    <RippleFX style={styles.categoryContainer} onPress={navigateToCenters}>
      <ProgressiveImage
        thumbnailSource={{ uri: IMAGE_URL + data?.featured_img }}
        source={{ uri: IMAGE_URL + smallUrl(data?.featured_img) }}
        style={styles.image}
      />
      <Box padding={10}>
        <Text style={styles.heading}>{data?.[`title_${language}`]}</Text>
        <Text style={styles.caption}>
          {data?.centersCount} {data?.type === 'specialist' ? t('specialist') : t('centers')}
        </Text>
      </Box>
    </RippleFX>
  );
}

export default memo(Category);