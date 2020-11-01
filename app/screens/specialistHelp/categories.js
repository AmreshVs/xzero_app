import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Box from 'components/box';
import { getShadowStyle } from 'constants/commonFunctions';
import RippleFX from 'components/rippleFx';
import { SPECIALISTS } from 'navigation/routes';
import { IMAGE_URL } from 'constants/common';
import ProgressiveImage from 'components/progressiveImage';

export default function Categories({ data }) {
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
      <ProgressiveImage source={{ uri: IMAGE_URL + data?.featured_img }} style={styles.image} />
      <Box padding={10}>
        <Text style={styles.heading}>{data?.[`title_${language}`]}</Text>
        <Text style={styles.caption}>
          {data?.centersCount} {t('specialist')}
        </Text>
      </Box>
    </RippleFX>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '49%',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: '4%',
    ...getShadowStyle(),
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heading: {
    fontWeight: '700',
    color: colors.text_dark,
    marginBottom: 5,
  },
  caption: {
    color: colors.text_lite,
  },
});
