import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import BuyVoucherModal from 'screens/voucherDetail/buyVoucherModal';
import { VOUCHERS } from 'graphql/queries';
import { VOUCHERS as NAV_VOUCHER } from 'graphql/queries';
import Voucher from './voucher';
import styles from './styles';
import { isTab } from 'constants/commonFunctions';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';

export default function Vouchers() {
  const [reloading, setReloading] = useState(false);
  const [voucherData, setVoucherData] = useState([]);
  const [promocodeData, setPromocodeData] = useState({ discountedPrice: 0 });
  const modalizeRef = useRef(null);
  const { logError } = useErrorLog();
  const { t } = useTranslation();

  const queryInput = {
    membership_plan: 1
  };

  const { data, loading, refetch: _refetch, error } = useQuery(VOUCHERS, {
    variables: queryInput
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: NAV_VOUCHER,
      module: 'Get Vouchers',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

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