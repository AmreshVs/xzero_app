import React from 'react';
import { Image, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';

export default function AssuredGift() {
  return (
    <Card paddingBottom={15}>
      <Text style={styles.title}>Assured Gift</Text>
      <Image source={{ uri: 'https://rukminim1.flixcart.com/image/800/960/kg9qbgw0-0/shoe/y/k/n/fw1753-reebok-black-rose-none-original-imafwj2tuev4dpm6.jpeg?q=50' }} style={styles.productImg} />
      <Text style={styles.title}>Reebok Shoe</Text>
      <Text style={styles.caption}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}</Text>
    </Card>
  )
}