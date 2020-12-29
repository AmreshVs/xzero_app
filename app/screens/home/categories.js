import React from 'react';
import { memo } from 'react';
import { View } from 'react-native';

import Category from './category';
import styles from './styles';

const Categories = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Category data={item} length={data.length} index={index} key={index} />
      ))}
    </View>
  );
}

export default memo(Categories);