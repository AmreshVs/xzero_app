import React from 'react';
import { Image, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';
import { IMAGE_URL } from 'constants/common';

export default function MembershipPlan() {
  return (
    <Card paddingBottom={15}>
      <Image source={{ uri: IMAGE_URL + '/uploads/Xzero_Diamond_Plan_78a6d8c86e.png' }} style={styles.membershipImg} />
      <Text style={styles.title}>Free Xzero Diamond Membership</Text>
      <Text style={styles.caption}>{`Enjoy all the benefits of Xzero Memership for 1 Year`}</Text>
    </Card>
  )
}