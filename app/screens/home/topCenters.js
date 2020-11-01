import React from 'react';
import { View } from 'react-native';

import Center from './center';

export default function TopCenters({ data }) {
  return (
    <View>
      {data.map((item, index) => (
        <Center data={item} key={index} />
      ))}
    </View>
  );
}
