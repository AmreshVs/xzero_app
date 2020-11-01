import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colors from 'constants/colors';

export default function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
