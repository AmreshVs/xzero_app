import React from 'react';
import { Image, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';

export default function Buy() {
  return (
    <Card marginBottom={10}>
      <Text style={styles.title}>Buy</Text>
      <Image source={{ uri: 'https://rukminim1.flixcart.com/image/800/960/jv44mfk0/backpack/y/p/g/bag-bptek05eblu-laptop-backpack-skybags-original-imafff2xwzaygc3f.jpeg?q=50' }} style={styles.productImg} />
      <Text style={styles.title}>Bag 30 L Laptop Backpack </Text>
      <Text style={styles.caption}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}</Text>
    </Card>
  )
}