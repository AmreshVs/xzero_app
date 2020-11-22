import React from 'react';
import { Image, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';

export default function Rules() {
  return (
    <Card marginBottom={10}>
      <Text style={styles.title}>Rules</Text>
      <Text style={styles.caption}>
        {` 1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. \n2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. \n3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. \n4. Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
      </Text>
    </Card>
  )
}