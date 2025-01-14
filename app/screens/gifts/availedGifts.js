import React, { memo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Gift from './gift';
import styles from './styles';

const AvailedGifts = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box padding={10} paddingBottom={0}>
        <Text style={styles.heading}>{t('availed_gifts')}</Text>
        <Text style={styles.hcaption}>{t('availed_gifts_caption')}</Text>
      </Box>
      <ScrollView contentContainerStyle={styles.availedWrapper} horizontal={true} removeClippedSubviews={true}>
        {data.map((gift, index) => <View style={styles.availedGiftContainer} key={index}><Gift data={gift} availed={true} /></View>)}
      </ScrollView>
    </>
  )
}

export default memo(AvailedGifts);