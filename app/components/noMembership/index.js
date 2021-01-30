import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Button from 'components/button';
import Card from 'components/card';
import ProgressiveImage from 'components/progressiveImage';
import Row from 'components/row';
import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import { isTab, smallUrl } from 'constants/commonFunctions';
import { MEMBERSHIP_TAB_SCREEN } from 'navigation/routes';
import { FadeInUpAnim } from 'animation';

const NoMembership = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <FadeInUpAnim>
      <Card width={isTab() ? '70%' : '100%'}>
        <Text style={styles.title}>{t('nomembership')}</Text>
        <Row hcenter>
          <ProgressiveImage
            source={{ uri: IMAGE_URL + smallUrl('/uploads/no_access_863e89685e.webp') }}
            style={styles.image}
            resizeMode='contain'
          />
        </Row>
        <Text style={styles.caption}>{t('membership_gift')}</Text>
        <Button
          onPress={() => navigation.navigate(MEMBERSHIP_TAB_SCREEN)}
        >
          {t('buy_membership')}
        </Button>
      </Card>
    </FadeInUpAnim>
  )
}

export default NoMembership;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    color: colors.text_dark,
    marginBottom: 5
  },
  caption: {
    color: colors.text_lite,
    marginBottom: 5
  },
  image: {
    width: 300,
    height: 300
  }
});