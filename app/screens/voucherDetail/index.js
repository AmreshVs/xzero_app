import React, { useRef, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Button from 'components/button';
import NoData from 'components/noData';
import VoucherInfo from './voucherInfo';
import Buy from './buy';
import Win from './win';
import AssuredGift from './assuredGift';
import Rules from './rules';
import CenterSymbol from './centerSymbol';
import MembershipPlan from './membershipPlan';
import Help from './help';
import { VOUCHER_DETAIL } from 'graphql/queries';
import BuyVoucherModal from './buyVoucherModal';
import styles from './styles';

export default function VoucherDetail() {
  const { t } = useTranslation();
  const [reloading, setReloading] = useState(false);
  const [promocodeData, setPromocodeData] = useState({ discountedPrice: 0 });
  const modalizeRef = useRef(null);
  const { params } = useRoute();

  const { data, loading, refetch: _refetch } = useQuery(VOUCHER_DETAIL, {
    variables: {
      id: Number(params?.id)
    }
  });

  const handleOpenModal = () => {
    setPromocodeData({ discountedPrice: data?.voucher?.cost });
    modalizeRef.current?.open();
  };

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  }

  let voucher = data?.voucher;

  return (
    <>
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
      </SafeView>
      <BuyVoucherModal modalizeRef={modalizeRef} promocodeData={promocodeData} setPromocodeData={setPromocodeData} voucher={voucher} />
    </>
  )
}