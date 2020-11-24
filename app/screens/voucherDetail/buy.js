import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import ProductSlider from './productSlider';
import styles from './styles';

export default function Buy({ data }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card paddingBottom={15}>
      <Text style={styles.title}>{t('buy')}</Text>
      {data.map((product, index) => {
        return (
          <View key={index}>
            <ProductSlider data={product?.featured_imgs} />
            <Text style={styles.title}>{product?.[`title_${language}`]}</Text>
            <Text style={styles.caption}>{product?.[`desc_${language}`]}</Text>
          </View>
        )
      })}
    </Card>
  )
}