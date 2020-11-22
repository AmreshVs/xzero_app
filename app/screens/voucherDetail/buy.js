import React from 'react';
import { Text } from 'react-native';

import Card from 'components/card';
import ProductSlider from './productSlider';
import styles from './styles';

export default function Buy() {
  const sliderData = [
    {
      image: 'https://rukminim1.flixcart.com/image/800/960/jv44mfk0/backpack/y/p/g/bag-bptek05eblu-laptop-backpack-skybags-original-imafff2xwzaygc3f.jpeg?q=50',
    },
    {
      image: 'https://rukminim1.flixcart.com/image/800/960/jv44mfk0/backpack/y/p/g/bag-bptek05eblu-laptop-backpack-skybags-original-imafff3egwkmymaa.jpeg?q=50',
    },
    {
      image: 'https://rukminim1.flixcart.com/image/800/960/kh80vww0/backpack/y/p/g/bag-bptek05eblu-laptop-backpack-skybags-30-original-imafxajmacayhbhf.jpeg?q=50',
    },
    {
      image: 'https://rukminim1.flixcart.com/image/800/960/jv2p6kw0/backpack/y/p/g/bag-bptek05eblu-laptop-backpack-skybags-original-imafff3eejrpgcfr.jpeg?q=50',
    },
  ];

  return (
    <Card paddingBottom={15}>
      <Text style={styles.title}>Buy</Text>
      <ProductSlider data={sliderData} />
      <Text style={styles.title}>Bag 30 L Laptop Backpack </Text>
      <Text style={styles.caption}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}</Text>
    </Card>
  )
}