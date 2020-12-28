import colors from 'constants/colors';
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';

export default function Loader({ spinner = false }) {
  return (
    <View style={!spinner ? styles.container : styles.spinnerContainer}>
      {!spinner ?
        <View>
          <Image source={require('../../../assets/splash_logo.png')} style={styles.image} />
          <ActivityIndicator color={colors.primary} size={30} style={styles.spinner} />
        </View>
        :
        <ActivityIndicator color='#999999' />
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
    width: 100,
    height: 100,
    marginBottom: -35,
    marginLeft: 5
  },
  spinner: {
    backgroundColor: '#FFF'
  }
});