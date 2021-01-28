import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Box from 'components/box';
import ProductSlider from './productSlider';
import styles from './styles';

const Buy = ({ member, data }) => {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <Card paddingBottom={15}>
      {!member && <Text style={styles.title}>{t('buy')}</Text>}
      {data.map((product, index) => {
        return (
          <View key={index}>
            <ProductSlider data={product?.featured_imgs} />
            <Box marginBottom={10} />
            <Text style={styles.title}>{product?.[`title_${language}`]}</Text>
            <Text style={styles.caption}>{product?.[`desc_${language}`]}</Text>
          </View>
        )
      })}
    </Card>
  )
}

export default memo(Buy);