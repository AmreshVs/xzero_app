import React from 'react';
import { StyleSheet, View } from 'react-native';

import News from './news';

const Stories = () => {
  return (
    <View style={styles.container}>
      <News />
      <News />
      <News />
      <News />
      <News />
      <News />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});

export default Stories;