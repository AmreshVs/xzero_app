import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-banner-carousel';

import { IMAGE_URL } from 'constants/common';
import ProgressiveImage from 'components/progressiveImage';
import styles from './styles';

export default function Slider({ data }) {
  return (
    <Carousel
      autoplay
      autoplayTimeout={5000}
      activePageIndicatorStyle={styles.indicator}
      loop
      pageSize={Dimensions.get('window').width}
      style={styles.slider}
    >
      {data &&
        data.map((banner) => {
          return (
            <ProgressiveImage
              style={styles.sliderImage}
              source={{ uri: IMAGE_URL + banner.banner_img.url }}
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