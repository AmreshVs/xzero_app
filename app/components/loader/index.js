import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/loader.gif')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  image: {
    width: 150,
    height: 150,
  },
});
