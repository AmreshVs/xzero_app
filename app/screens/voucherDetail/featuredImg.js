import React from 'react';
import { Image, View } from 'react-native';

import styles from './styles';

export default function FeaturedImg() {
  return (
    <View style={styles.imgContainer}>
      <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/0067/3307/0421/files/WhatsApp_Image_2020-03-17_at_5.44.59_PM.jpeg?v=1584439244' }} style={styles.image} />
    </View>
  )
}