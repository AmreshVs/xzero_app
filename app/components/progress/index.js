import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from 'constants/colors';

const getColor = (percent) => {
  if (percent > 0 && percent <= 35)
    return '#54ab76';
  if (percent > 35 && percent <= 45)
    return '#2995d6';
  if (percent > 45 && percent <= 55)
    return '#5565aa';
  if (percent > 55 && percent <= 65)
    return '#d8bf27';
  if (percent > 65 && percent <= 75)
    return '#f0a40f';
  if (percent > 75 && percent <= 85)
    return '#e1481e';
  if (percent > 85 && percent <= 100)
    return '#f90706';
  return colors.chip_2;
}

export default function Progress({ countText, colorful, percent = 0 }) {
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
      backgroundColor: colorful ? getColor(percent) : colors.chip_2,
      borderRadius: 15,
    },
    textContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: '#000',
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.progress}></View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{countText}</Text>
      </View>
    </View>
  )
}