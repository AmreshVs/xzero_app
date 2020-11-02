import React, { useCallback, useState } from 'react';
import { FlatList, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Notification from './notification';
import Divider from 'components/divider';
import { NOTIFICATIONS } from 'graphql/queries';
import NoData from 'components/noData';
import styles from './styles';

export default function Notifications() {
  const [reloading, setReloading] = useState(false);
  const { data, loading, refetch } = useQuery(NOTIFICATIONS);
  const { t } = useTranslation();

  const _refetch = useCallback(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      if (refetch) await refetch();
    });
    return () => task.cancel();
  }, [refetch]);

  const reload = async () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  };

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={t('notifications')} gradient />
      {!data?.notifications.length ? (
        <NoData topNav />
      ) : (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={data?.notifications}
            renderItem={({ item }) => <Notification {...item} />}
            initialNumToRender={6}
            maxToRenderPerBatch={10}
            windowSize={10}
            contentContainerStyle={styles.flatlist}
            ItemSeparatorComponent={() => <Divider />}
            refreshing={reloading}
            onRefresh={reload}
            removeClippedSubviews={true}
          />
        )}
    </SafeView>
  );
}