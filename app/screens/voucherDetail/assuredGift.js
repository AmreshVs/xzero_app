import React, { memo } from 'react';
import { Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import { IMAGE_URL } from 'constants/common';
import ProductSlider from './productSlider';
import styles from './styles';
import { smallUrl } from 'constants/commonFunctions';

const AssuredGift = ({ data }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card paddingBottom={15}>
      <Text style={styles.title}>{t('assured_gift')}</Text>
      {data?.featured_img.length > 1
        ?
        <ProductSlider data={data?.featured_img} />
        :
        <Image source={{ uri: IMAGE_URL + smallUrl(data?.featured_img[0]?.url) }} style={styles.productImg} />
      }
      <Text style={styles.title}>{data?.[`title_${language}`]}</Text>
      <Text style={styles.caption}>{data?.[`desc_${language}`]}</Text>
    </Card>
  )
}

export default memo(AssuredGift);