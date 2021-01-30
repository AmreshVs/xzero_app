import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import { FadeInUpAnim } from 'animation';
import Gift from './gift';
import styles from './styles';

const AvailableGifts = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box padding={10} paddingBottom={0}>
        <Text style={styles.heading}>{t('chance_to_win')}</Text>
        <Text style={styles.hcaption}>{t('gifts_listed_below')}</Text>
      </Box>
      <View style={styles.wrapper}>
        {data?.map((gift, index) => (
          <FadeInUpAnim style={styles.giftContainer} key={index} delay={index * 100}>
            <Gift data={gift} />
          </FadeInUpAnim>
        ))}
      </View>
    </>
  )
}

export default memo(AvailableGifts);