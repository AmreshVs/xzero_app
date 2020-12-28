import React, { memo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabItem from './tabItem';
import style from './style';

const BottomTab = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const styles = style(insets);

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        return (
          <TabItem state={state} options={options} route={route} index={index} navigation={navigation} key={index} />
        );
      })}
    </View>
  );
}

export default memo(BottomTab);