import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Progress({ percent = 0, countText }) {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 18,
      backgroundColor: '#EEE',
      borderRadius: 15
    },
    progress: {
      width: `${percent}%`,
      height: 18,
      backgroundColor: 'orange',
      borderRadius: 15,
    },
    textContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.progress}></View>
      <View style={styles.textContainer}>
        <Text>{countText}</Text>
      </View>
    </View>
  )
}