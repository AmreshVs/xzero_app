import React, { useState, useCallback } from 'react';
import { FlatList, InteractionManager } from 'react-native';
import { useRoute } from '@react-navigation/native';

import SafeView from 'components/safeView';
import NoData from 'components/noData';
import TopNavigator from 'components/topNavigator';
import Center from './center';
import { useQuery } from '@apollo/client';
import { GET_CENTERS } from 'graphql/queries';
import styles from './styles';

export default function Centers() {
  const [reloading, setReloading] = useState(false);
  const { params } = useRoute();
  let { data, loading, refetch } = useQuery(GET_CENTERS, {
    variables: { category: Number(params?.id) },
  });

  const _refetch = useCallback(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      if (refetch) await refetch();
    });
    return () => task.cancel();
  }, [reloading]);

  const reload = async () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  };

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={params?.title} gradient />
      {(data?.topCenters !== undefined && !data?.topCenters.length) || data === {} ? (
        <NoData topNav />
      ) : (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={data?.topCenters}
            renderItem={({ item }) => <Center data={item} />}
            numColumns={2}
            initialNumToRender={6}
            maxToRenderPerBatch={10}
            windowSize={10}
            columnWrapperStyle={styles.centers}
            contentContainerStyle={styles.flatlist}
            refreshing={reloading}
            onRefresh={() => reload()}
            removeClippedSubviews={true}
          />
        )}
    </SafeView>
  );
}