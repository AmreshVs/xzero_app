import React from 'react';
import { memo } from 'react';
import { View } from 'react-native';

import Category from './category';
import styles from './styles';

const Categories = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Category data={item} key={index} />
      ))}
    </View>
  );
}

export default memo(Categories);