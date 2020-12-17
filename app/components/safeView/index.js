import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loader from 'components/loader';

export default function SafeView({ style, children, loading, noTop, noBottom, topNav }) {
  const insets = useSafeAreaInsets();

  const getBottom = () => {
    if (noBottom) return 0;
    if (topNav) return Platform.OS === 'ios' ? insets.bottom + 50 : 50;
    return insets.bottom;
  };

  const styles = StyleSheet.create({
    container: {
      paddingTop: noTop ? 0 : insets.top,
      paddingBottom: getBottom(),
      minHeight: '100%'
    },
  });
  return <>{loading ? <Loader /> : <View style={[style, styles.container]}>{children}</View>}</>;
}
