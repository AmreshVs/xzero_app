import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ProgressiveImage from 'components/progressiveImage';
import Card from 'components/card';
import { IMAGE_URL } from 'constants/common';
import { smallUrl } from 'constants/commonFunctions';
import ProductSlider from './productSlider';
import styles from './styles';

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
        <ProgressiveImage
          style={styles.productImg}
          source={{ uri: IMAGE_URL + smallUrl(data?.featured_img[0]?.url) }}
        />
      }
      <Text style={styles.title}>{data?.[`title_${language}`]}</Text>
      <Text style={styles.caption}>{data?.[`desc_${language}`]}</Text>
    </Card>
  )
}

export default memo(AssuredGift);