import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Row({
  children,
  vcenter,
  hcenter,
  spaceBetween,
  spaceAround,
  style,
  ...otherStyles
}) {
  const getJustifyContent = () => {
    if (hcenter) return 'center';
    if (spaceBetween) return 'space-between';
    if (spaceAround) return 'space-around';
    return 'flex-start';
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: vcenter ? 'center' : 'flex-start',
          justifyContent: getJustifyContent(),
          flexWrap: 'wrap',
          ...otherStyles,
        },
      }),
    []
  );

  return <View style={[style, styles.container]}>{children}</View>;
}
