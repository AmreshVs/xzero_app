import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-banner-carousel';

import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import ProgressiveImage from 'components/progressiveImage';

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
              style={styles.image}
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

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width - 20,
    height: 200,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  indicator: {
    backgroundColor: colors.primary,
  },
  slider: {
    backgroundColor: 'red',
    overflow: 'hidden',
  },
});
