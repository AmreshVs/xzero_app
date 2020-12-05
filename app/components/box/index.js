import Loader from 'components/loader';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Box({ children, padding, style, loading, ...otherStyles }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: padding,
          ...otherStyles,
        },
      }),
    []
  );

  return <View style={[style, styles.container]}>{loading ? <Loader spinner /> : children}</View>;
}
