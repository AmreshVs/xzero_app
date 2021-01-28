import { FadeInLeftAnim } from 'animation';
import React, { memo } from 'react';
import { View } from 'react-native';

import Center from './center';
import styles from './styles';

const TopCenters = ({ data }) => {
  return (
    <View style={styles.topCenters}>
      {data.map((item, index) => (
        <FadeInLeftAnim delay={index * 50} key={index}>
          <Center data={item} />
        </FadeInLeftAnim>
      ))}
    </View>
  );
}

export default memo(TopCenters);