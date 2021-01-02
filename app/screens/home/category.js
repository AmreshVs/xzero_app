import React, { memo } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import { isTab, thumbnailUrl } from 'constants/commonFunctions';
import { IMAGE_URL } from 'constants/common';
import { CENTERS_SCREEN, SPECIALIST_HELP } from 'navigation/routes';
import styles from './styles';

const Category = ({ data, length, index }) => {
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
    <RippleFX
      style={(length % 2 !== 0 && index === length - 1 && !isTab()) ? styles.oddContainer : styles.categoryContainer}
      onPress={navigateToCenters}
    >
      <ProgressiveImage
        thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img) }}
        source={{ uri: IMAGE_URL + data?.featured_img }}
        style={(length % 2 !== 0 && index === length - 1 && !isTab()) ? styles.oddImage : styles.image}
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