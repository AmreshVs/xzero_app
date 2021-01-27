import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RippleFX from 'components/rippleFx';
import { getShadowStyle } from 'constants/commonFunctions';
import colors from 'constants/colors';
import Icon from 'icon';

export default function FloatingButton({ handlePress }) {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    floatingContainer: {
      width: 50,
      height: 50,
      backgroundColor: colors.chip_1,
      position: 'absolute',
      bottom: 60,
      right: 10,
      marginBottom: insets.bottom,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      ...getShadowStyle(),
      overflow: 'hidden',
    }
  });
  return (
    <RippleFX style={styles.floatingContainer} onPress={handlePress}>
      <Icon name="search" />
    </RippleFX>
  )
}