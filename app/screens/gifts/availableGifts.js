import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Gift from './gift';
import styles from './styles';
import { memo } from 'react';

const AvailableGifts = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box padding={10} paddingBottom={0}>
        <Text style={styles.heading}>{t('chance_to_win')}</Text>
        <Text style={styles.hcaption}>{t('gifts_listed_below')}</Text>
      </Box>
      <View style={styles.wrapper}>
        {data.map((gift, index) => (
          <View style={styles.giftContainer} key={index}>
            <Gift data={gift} />
          </View>
        ))}
      </View>
    </>
  )
}

export default memo(AvailableGifts);