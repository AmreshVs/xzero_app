import React from 'react';
import { Text } from 'react-native';

import Card from 'components/card';
import ProductSlider from './productSlider';
import styles from './styles';

export default function Buy() {

  const sliderData = [
    {
      image: 'https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dhe5aeyhk.jpeg?q=70',
    },
    {
      image: 'https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dkyh2zgrh.jpeg?q=70',
    },
    {
      image: 'https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8duhgegw9p.jpeg?q=70',
    },
    {
      image: 'https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dszwspt8f.jpeg?q=70',
    },
  ];

  return (
    <Card marginBottom={10}>
      <Text style={styles.title}>A Chance to Win</Text>
      {/* <Image source={{ uri: 'https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dhe5aeyhk.jpeg?q=70' }} style={styles.productImg} /> */}
      <ProductSlider data={sliderData} />
      <Text style={styles.title}>Apple iPhone 12</Text>
      <Text style={styles.caption}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}</Text>
    </Card>
  )
}