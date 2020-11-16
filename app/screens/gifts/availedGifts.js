import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import styles from './styles';
import Box from 'components/box';

const data = [
  { id: 1, title_en: 'Title 1' },
  { id: 2, title_en: 'Title 2' },
  { id: 3, title_en: 'Title 3' },
  { id: 4, title_en: 'Title 4' },
  { id: 5, title_en: 'Title 5' },
];

const Gift = ({ data }) => {
  return (
    <Card style={styles.availableGiftsContainer}>
      <View style={styles.giftImageContainer}>
        <View style={styles.giftImages}></View>
        <Image source={require('../../../assets/gift2.png')} style={styles.giftImage} />
        <Text style={styles.title} numberOfLines={2}>{data?.title_en}</Text>
        <Text style={styles.caption} numberOfLines={2}>Title</Text>
      </View>
    </Card>
  )
}

export default function AvailedGifts() {
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