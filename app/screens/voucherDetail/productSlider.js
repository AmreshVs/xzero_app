import React, { useState, memo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';

import { IMAGE_URL, SCREEN_WIDTH } from 'constants/common';

const ProductSlider = ({ data, height, popup = false }) => {
  const [slide, setSlide] = useState(0);

  const styles = StyleSheet.create({
    item: {
      width: popup === false ? SCREEN_WIDTH - 60 : '100%',
      height: popup === false ? SCREEN_WIDTH - 60 : '100%',
    },
    imageContainer: {
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
      width: popup === false ? '80%' : '100%',
      height: popup === false ? 250 : height,
    },
    sliderImage: {
      resizeMode: popup === false ? 'contain' : 'cover',
    },
    slider: {
      width: '100%',
      height: popup === false ? 250 : height,
      marginTop: popup === false ? 5 : 0
    },
    pagination: {
      position: 'absolute',
      bottom: 0
    }
  });

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
          backgroundColor: popup === false ? '#000' : '#FFF'
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
          autoplay={false}
          sliderWidth={SCREEN_WIDTH - 45}
          itemWidth={popup === false ? SCREEN_WIDTH - 130 : SCREEN_WIDTH}
          data={data}
          renderItem={renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => setSlide(index)}
          removeClippedSubviews={true}
        />
      </View>
      <View style={popup ? styles.pagination : {}}>
        <SliderPagination />
      </View>
    </>
  )
}

export default memo(ProductSlider);