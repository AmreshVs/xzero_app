import React, { memo } from 'react';
import Carousel from 'react-native-banner-carousel';
import { useTranslation } from 'react-i18next';

import ProgressiveImage from 'components/progressiveImage';
import { thumbnailUrl } from 'constants/commonFunctions';
import { IMAGE_URL } from 'constants/common';
import useScreenDimensions from 'hooks/useScreenDimensions';
import { FadeInUpAnim } from 'animation';
import styles from './styles';

const Slider = ({ data }) => {
  const { i18n } = useTranslation();
  const screenData = useScreenDimensions();
  let language = i18n.language;

  return (
    <Carousel
      autoplay
      autoplayTimeout={7000}
      activePageIndicatorStyle={styles.indicator}
      loop
      pageSize={screenData?.width}
      style={styles.slider}
    >
      {data &&
        data?.map((banner) => {
          return (
            <FadeInUpAnim key={banner.id}>
              <ProgressiveImage
                style={styles.sliderImage}
                thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(banner?.[`banner_img_${language}`]?.url) }}
                source={{ uri: IMAGE_URL + banner?.[`banner_img_${language}`]?.url }}
                resizeMode="cover"
              />
            </FadeInUpAnim>
          );
        })}
    </Carousel>
  );
}

export default memo(Slider);