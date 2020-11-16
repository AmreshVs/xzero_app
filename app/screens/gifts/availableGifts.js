import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';
import Box from 'components/box';
import { useTranslation } from 'react-i18next';

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
        <Image source={require('../../../assets/gift3.png')} style={styles.giftImage} />
        <Text style={styles.title} numberOfLines={2}>{data?.title_en}</Text>
        <Text style={styles.caption} numberOfLines={2}>Title</Text>
      </View>
    </Card>
  )
}

export default function AvailableGifts() {
  const { t } = useTranslation();

  return (
    <>
      <Box padding={10} paddingBottom={0}>
        <Text style={styles.heading}>{t('chance_to_win')}</Text>
        <Text style={styles.hcaption}>{t('gifts_listed_below')}</Text>
      </Box>
      <View style={styles.wrapper}>
        {data.map((gift, index) => <View style={styles.giftContainer} key={index}><Gift data={gift} /></View>)}
      </View>
    </>
  )
}