import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import VoucherInfo from './voucherInfo';
import Buy from './buy';
import Win from './win';
import AssuredGift from './assuredGift';
import Rules from './rules';
import Button from 'components/button';
import CenterSymbol from './centerSymbol';
import MembershipPlan from './membershipPlan';
import Help from './help';
import styles from './styles';
import { SCREEN_HEIGHT } from 'constants/common';
import ApplyPromocode from 'components/applyPromocode';
import DeliveryAddress from 'components/deliveryAddress';

export default function VoucherDetail() {

  const modalizeRef = useRef(null);

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  return (
    <SafeView topNav>
      <TopNavigator gradient title="Voucher Detail" />
      <ScrollView style={styles.container}>
        <VoucherInfo />
        <MembershipPlan />
        <CenterSymbol text="You will get" />
        <Buy />
        <CenterSymbol icon="plus" />
        <AssuredGift />
        <CenterSymbol icon="plus" />
        <Win />
        <Rules />
        <Help />
      </ScrollView>
      <View style={styles.buyNowButton}>
        <Button onPress={() => handleOpenModal()}>200 AED - Buy Now</Button>
      </View>
      <Modalize ref={modalizeRef} childrenStyle={styles.modal} modalHeight={SCREEN_HEIGHT / 1.5}>
        <DeliveryAddress />
        <ApplyPromocode />
      </Modalize>
    </SafeView >
  )
}