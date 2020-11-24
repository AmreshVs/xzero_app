import React, { useCallback, useState } from 'react';
import { FlatList, InteractionManager, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Voucher from './voucher';
import styles from './styles';
import { useQuery } from '@apollo/client';
import { VOUCHERS } from 'graphql/queries';
import NoData from 'components/noData';

export default function Vouchers() {
  const [reloading, setReloading] = useState(false);
  const { t } = useTranslation();
  const { data, loading, refetch: _refetch } = useQuery(VOUCHERS, {
    variables: {
      membership_plan: 1
    }
  });

  const reload = async () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  };

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={t('vouchers')} gradient />
      {!data?.vouchers.length ? (
        <NoData topNav />
      ) : (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={data.vouchers}
            renderItem={({ item }) => <Voucher data={item} />}
            numColumns={2}
            initialNumToRender={6}
            maxToRenderPerBatch={10}
            windowSize={10}
            columnWrapperStyle={styles.centers}
            contentContainerStyle={styles.vouchersScrollView}
            refreshing={reloading}
            onRefresh={() => reload()}
            removeClippedSubviews={true}
          />
        )}
    </SafeView>
  );
}