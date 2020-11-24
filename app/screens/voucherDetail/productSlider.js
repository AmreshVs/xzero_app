import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';

import { IMAGE_URL, SCREEN_WIDTH } from 'constants/common';

export default function ProductSlider({ data }) {
  const [slide, setSlide] = useState(1);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item} key={index}>
        <ParallaxImage
          source={{ uri: IMAGE_URL + item.url }}
          containerStyle={styles.imageContainer}
          style={styles.sliderImage}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  const SliderPagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={slide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#000'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  return (
    <>
      <View style={styles.slider}>
        <Carousel
          sliderWidth={SCREEN_WIDTH - 45}
          itemWidth={SCREEN_WIDTH - 130}
          data={data}
          renderItem={renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => setSlide(index)}
          removeClippedSubviews={true}
        />
      </View>
      <SliderPagination />
    </>
  )
}

const styles = StyleSheet.create({
  item: {
    width: SCREEN_WIDTH - 60,
    height: SCREEN_WIDTH - 60,
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    width: '80%',
    height: 250,
  },
  sliderImage: {
    resizeMode: 'contain',
  },
  slider: {
    width: '100%',
    height: 250,
    marginTop: 5
  }
});