import React, { memo } from 'react';
import { View } from 'react-native';

import Center from './center';
import styles from './styles';

const TopCenters = ({ data }) => {
  return (
    <View style={styles.topCenters}>
      {data.map((item, index) => (
        <Center data={item} key={index} />
      ))}
    </View>
  );
}

export default memo(TopCenters);