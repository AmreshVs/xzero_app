import React from 'react';
import { StyleSheet, View } from 'react-native';

import Category from './category';

export default function Categories({ data }) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Category data={item} key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
