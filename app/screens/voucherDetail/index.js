import React, { useRef, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Button from 'components/button';
import ApplyPromocode from 'components/applyPromocode';
import DeliveryAddress from 'components/deliveryAddress';
import { SCREEN_HEIGHT } from 'constants/common';
import NoData from 'components/noData';
import VoucherInfo from './voucherInfo';
import Buy from './buy';
import Win from './win';
import AssuredGift from './assuredGift';
import Rules from './rules';
import CenterSymbol from './centerSymbol';
import MembershipPlan from './membershipPlan';
import Help from './help';
import { PAYMENT } from 'navigation/routes';
import { VOUCHER_DETAIL } from 'graphql/queries';
import styles from './styles';

export default function VoucherDetail({ navigation }) {
  const { t } = useTranslation();
  const [reloading, setReloading] = useState(false);
  const modalizeRef = useRef(null);
  const { params } = useRoute();

  const { data, loading, refetch: _refetch } = useQuery(VOUCHER_DETAIL, {
    variables: {
      id: Number(params?.id)
    }
  });

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  }

  let voucher = data?.voucher;

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator gradient title="Voucher Detail" />
      {!data?.voucher ? (
        <NoData topNav />
      ) : (
          <>
            <ScrollView
              style={styles.container}
              refreshing={reloading}
              refreshControl={<RefreshControl refreshing={reloading} onRefresh={() => reload()} />}
              onRefresh={() => reload()}
            >
              <VoucherInfo data={voucher} />
              <MembershipPlan data={voucher?.membership_plans[0]} />
              <CenterSymbol text={t('you_will_get')} />
              <Buy data={voucher?.product} />
              <CenterSymbol icon="plus" />
              <AssuredGift data={voucher?.assured_gift[0]} />
              <CenterSymbol icon="plus" />
              <Win data={voucher?.draw_gift} />
              <Rules data={data?.voucherRule} />
              <Help />
            </ScrollView>
            <View style={styles.buyNowButton}>
              <Button onPress={() => handleOpenModal()}>{voucher?.cost} {t('aed')} - {t('buy_now')}</Button>
            </View>
          </>
        )}
      <Modalize ref={modalizeRef} childrenStyle={styles.modal} modalHeight={SCREEN_HEIGHT / 1.5} scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}>
        <SafeView style={styles.safeView} noTop>
          <DeliveryAddress />
          <ApplyPromocode price={voucher?.cost} />
          <View style={styles.continueButton}>
            <Button onPress={() => navigation.push(PAYMENT, {
              currency_code: 'AED',
              amount: voucher?.cost,
              multiplier: 100,
              voucher_id: data?.id
            })}>
              {t('continue_to_pay')} {voucher?.cost} {t('aed')}
            </Button>
          </View>
        </SafeView>
      </Modalize>
    </SafeView >
  )
}