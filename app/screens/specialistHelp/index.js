import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { CATEGORIES } from 'graphql/queries';
import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import SafeView from 'components/safeView';
import Categories from './categories';
import styles from './styles';
import { isTab } from 'constants/commonFunctions';

export default function SpecialistHelp() {
  const [reloading, setReloading] = useState(false);
  const { params } = useRoute();
  let { data, loading, refetch: _refetch } = useQuery(CATEGORIES);

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  };

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={params?.title} gradient />
      {!data?.categoriesWithCenterCount.length ? (
        <NoData topNav />
      ) : (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={data?.categoriesWithCenterCount}
            renderItem={({ item }) => <Categories data={item} />}
            numColumns={isTab() ? 4 : 2}
            initialNumToRender={6}
            columnWrapperStyle={styles.centers}
            contentContainerStyle={styles.flatlist}
            refreshing={reloading}
            onRefresh={reload}
            removeClippedSubviews={true}
          />
        )}
    </SafeView>
  );
}