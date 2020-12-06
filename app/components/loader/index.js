import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function Loader({ spinner = false }) {
  return (
    <View style={!spinner ? styles.container : styles.spinnerContainer}>
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
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  image: {
    width: 150,
    height: 150,
  },
});