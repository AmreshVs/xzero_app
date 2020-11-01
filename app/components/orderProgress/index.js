import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

export default function OrderProgress({ children }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll} removeClippedSubviews={true}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scroll: {
    display: 'flex',
    width: '100%',
  },
});
