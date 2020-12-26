import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

const ReferCard = () => {
  return (
    <View style={styles.referContainer}>
      <LinearGradient colors={['#CB218E', '#6617CB']} style={styles.referGradient} />
      <Text>Do you know?</Text>
    </View>
  )
}

export default ReferCard;