import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import ProductSlider from './productSlider';
import styles from './styles';
import Divider from 'components/divider';

export default function Buy({ data }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card marginBottom={10}>
      <Text style={styles.title}>{t('a_chance_to_win')}</Text>
      {data.map((gift, index) => {
        return (
          <View key={index}>
            {index !== 0 && <Divider marginVertical={20} />}
            <>
              <ProductSlider data={gift?.featured_imgs} />
              <Text style={styles.title}>{gift?.[`title_${language}`]}</Text>
              <Text style={styles.caption}>{gift?.[`desc_${language}`]}</Text>
            </>
          </View>
        )
      })}
    </Card>
  )
}