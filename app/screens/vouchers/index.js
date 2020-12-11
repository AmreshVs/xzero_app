import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import BuyVoucherModal from 'screens/voucherDetail/buyVoucherModal';
import { VOUCHERS } from 'graphql/queries';
import Voucher from './voucher';
import styles from './styles';
import { isTab } from 'constants/commonFunctions';

export default function Vouchers() {
  const [reloading, setReloading] = useState(false);
  const [voucherData, setVoucherData] = useState([]);
  const [promocodeData, setPromocodeData] = useState({ discountedPrice: 0 });
  const modalizeRef = useRef(null);
  const { t } = useTranslation();
  const { data, loading, refetch: _refetch } = useQuery(VOUCHERS, {
    variables: {
      membership_plan: 1
    }
  });

  const handleOpenModal = (data) => {
    setVoucherData(data)
    setPromocodeData({ discountedPrice: data?.cost });
    modalizeRef.current?.open();
  };

  const reload = async () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  };

  return (
    <>
      <SafeView loading={loading} topNav>
        <TopNavigator title={t('vouchers')} gradient leftIcon={false} />
        {!data?.vouchers.length ? (
          <NoData topNav />
        ) : (
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={data.vouchers}
              renderItem={({ item }) => <Voucher handleOpenModal={handleOpenModal} data={item} />}
              numColumns={isTab() ? 2 : 1}
              initialNumToRender={6}
              maxToRenderPerBatch={10}
              windowSize={10}
              columnWrapperStyle={styles.vouchers}
              contentContainerStyle={styles.vouchersScrollView}
              refreshing={reloading}
              onRefresh={() => reload()}
            />
          )}
      </SafeView>
      <BuyVoucherModal modalizeRef={modalizeRef} promocodeData={promocodeData} setPromocodeData={setPromocodeData} voucher={voucherData} />
    </>
  );
}