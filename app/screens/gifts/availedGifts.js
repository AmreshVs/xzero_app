import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from './styles';
import Box from 'components/box';
import Gift from './Gift';

export default function AvailedGifts({ data }) {
  const { t } = useTranslation();

  return (
    <>
      <Box padding={10} paddingBottom={0}>
        <Text style={styles.heading}>{t('availed_gifts')}</Text>
        <Text style={styles.hcaption}>{t('availed_gifts_caption')}</Text>
      </Box>
      <ScrollView contentContainerStyle={styles.availedWrapper} horizontal={true} removeClippedSubviews={true}>
        {data.map((gift, index) => <View style={styles.availedGiftContainer} key={index}><Gift data={gift} /></View>)}
      </ScrollView>
    </>
  )
}