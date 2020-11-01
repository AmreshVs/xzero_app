import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { CATEGORIES } from 'graphql/queries';
import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import { FlatList } from 'react-native-gesture-handler';
import SafeView from 'components/safeView';
import Categories from './categories';

export default function SpecialistHelp() {
  const [reloading, setReloading] = useState(false);
  const { params } = useRoute();
  let { data, loading, refetch } = useQuery(CATEGORIES);

  const reload = async () => {
    setReloading(true);
    await refetch();
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
          numColumns={2}
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

const styles = StyleSheet.create({
  centers: {
    justifyContent: 'space-between',
  },
  flatlist: {
    padding: 10,
    height: '100%',
  },
});
