import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { SPECIALISTS_BY_CENTER } from 'graphql/queries';
import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import { FlatList } from 'react-native-gesture-handler';
import SafeView from 'components/safeView';
import Specialist from './specialist';

export default function SpecialistHelp() {
  const [reloading, setReloading] = useState(false);
  const { params } = useRoute();

  let { data, loading, refetch } = useQuery(SPECIALISTS_BY_CENTER, {
    variables: {
      center: Number(params?.id),
    },
  });

  const reload = async () => {
    setReloading(true);
    await refetch();
    setReloading(false);
  };

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={params?.title} gradient />
      {!data?.specialists.length ? (
        <NoData topNav />
      ) : (
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={data?.specialists}
          renderItem={({ item }) => <Specialist data={item} />}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={10}
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
  },
});
