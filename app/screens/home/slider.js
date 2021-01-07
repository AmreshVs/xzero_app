import React, { memo } from 'react';
import Carousel from 'react-native-banner-carousel';

import ProgressiveImage from 'components/progressiveImage';
import { isTab, smallUrl } from 'constants/commonFunctions';
import { IMAGE_URL } from 'constants/common';
import useScreenDimensions from 'hooks/useScreenDimensions';
import styles from './styles';

const Slider = ({ data }) => {
  const screenData = useScreenDimensions();

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
        data.map((banner) => {
          return (
            <ProgressiveImage
              style={styles.sliderImage}
              thumbnailSource={{ uri: IMAGE_URL + banner.banner_img.url }}
              source={{ uri: IMAGE_URL + (isTab() ? banner.banner_img.url : smallUrl(banner.banner_img.url)) }}
              resizeMode="cover"
              key={banner.id}
            />
          );
        })}
    </Carousel>
  );
}

export default memo(Slider);