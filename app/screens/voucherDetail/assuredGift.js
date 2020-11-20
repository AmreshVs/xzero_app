import React from 'react';
import { Image, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';

export default function AssuredGift() {
  return (
    <Card marginBottom={10}>
      <Text style={styles.title}>Assured Gift - Reebok Shoe</Text>
      <Image source={{ uri: 'https://rukminim1.flixcart.com/image/800/960/kg9qbgw0-0/shoe/y/k/n/fw1753-reebok-black-rose-none-original-imafwj2tuev4dpm6.jpeg?q=50' }} style={styles.productImg} />
    </Card>
  )
}