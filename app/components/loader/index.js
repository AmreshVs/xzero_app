import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function Loader({ spinner = false }) {
  return (
    <View style={styles.container}>
      {!spinner ?
        <Image source={require('../../../assets/loader.gif')} style={styles.image} />
        :
        <ActivityIndicator />
      }
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
