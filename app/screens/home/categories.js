import React from 'react';
import { View } from 'react-native';

import Category from './category';
import styles from './styles';

export default function Categories({ data }) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Category data={item} key={index} />
      ))}
    </View>
  );
}
