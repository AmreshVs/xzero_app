import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
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
import { PAYMENT } from 'navigation/routes';

export default function VoucherDetail({ navigation }) {

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
      <Modalize ref={modalizeRef} childrenStyle={styles.modal} modalHeight={SCREEN_HEIGHT / 1.5} scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}>
        <SafeView style={styles.safeView} noTop>
          <DeliveryAddress />
          <ApplyPromocode />
          <View style={styles.continueButton}>
            <Button onPress={() => navigation.push(PAYMENT, {
              currency_code: 'AED',
              amount: 100,
              multiplier: 100
            })}>
              Continue to pay 200 AED
            </Button>
          </View>
        </SafeView>
      </Modalize>
    </SafeView >
  )
}