import React from 'react';
import Carousel from 'react-native-banner-carousel';

import { IMAGE_URL } from 'constants/common';
import ProgressiveImage from 'components/progressiveImage';
import styles from './styles';
import useScreenDimensions from 'hooks/useScreenDimensions';
import { isTab, smallUrl } from 'constants/commonFunctions';
import { memo } from 'react';

const Slider = ({ data }) => {
  const screenData = useScreenDimensions();

  return (
    <Carousel
      autoplay
      autoplayTimeout={5000}
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
              resizeMode="stretch"
              key={banner.id}
              noCStyle
              noBg
            />
          );
        })}
    </Carousel>
  );
}

export default memo(Slider);