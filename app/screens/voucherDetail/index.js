import React from 'react';
import { ScrollView, View } from 'react-native';

import FeaturedImg from './featuredImg';
import SafeView from 'components/safeView';
import styles from './styles';
import TopNavigator from 'components/topNavigator';
import Buy from './buy';
import Win from './win';
import AssuredGift from './assuredGift';
import Rules from './rules';
import Button from 'components/button';

export default function VoucherDetail() {
  return (
    <SafeView topNav>
      <TopNavigator gradient title="Voucher Detail" />
      <ScrollView style={styles.container}>
        <FeaturedImg />
        <Buy />
        <Win />
        <AssuredGift />
        <Rules />
      </ScrollView>
      <View style={styles.buyNowButton}>
        <Button>200 AED - Buy Now</Button>
      </View>
    </SafeView>
  )
}