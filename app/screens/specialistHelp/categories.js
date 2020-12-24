import React, { memo } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import { SPECIALISTS } from 'navigation/routes';
import { IMAGE_URL } from 'constants/common';
import ProgressiveImage from 'components/progressiveImage';
import styles from './styles';
import { smallUrl } from 'constants/commonFunctions';

const Categories = ({ data }) => {
  if (data?.centersCount <= 0) {
    return null;
  }

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const navigateToCenters = () => {
    navigation.push(SPECIALISTS, {
      id: data?.id,
      title: t('specialist') + ' - ' + data?.[`title_${language}`],
    });
  };

  return (
    <RippleFX style={styles.container} onPress={navigateToCenters}>
      <ProgressiveImage source={{ uri: IMAGE_URL + smallUrl(data?.featured_img) }} style={styles.image} />
      <Box padding={10}>
        <Text style={styles.heading}>{data?.[`title_${language}`]}</Text>
        <Text style={styles.caption}>
          {data?.centersCount} {t('specialist')}
        </Text>
      </Box>
    </RippleFX>
  );
}

export default memo(Categories);