import React, { useState, useCallback } from 'react';
import { View, FlatList, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery, useApolloClient } from '@apollo/client';

import Offer from 'screens/offers/offer';
import NoData from 'components/noData';
import SafeView from 'components/safeView';
import Button from 'components/button';
import useUserData from 'hooks/useUserData';
import { FAVOURITES_BY_USER } from 'graphql/queries';
import { CLEAR_FAVOURITES } from 'graphql/mutations';
import IsLoggedIn from 'hoc/isLoggedIn';
import TopStatusBar from 'components/topStatusBar';
import styles from './styles';

const Favourites = () => {
  const { t } = useTranslation();
  const [reloading, setReloading] = useState(false);
  const userData = useUserData();
  const client = useApolloClient();
  const { data, loading, refetch } = useQuery(FAVOURITES_BY_USER, {
    variables: { user_id: Number(userData?.id) || 0 },
  });

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

  const handleClearAll = async () => {
    setReloading(true);
    const { data } = await client.mutate({
      mutation: CLEAR_FAVOURITES,
      variables: {
        user_id: Number(userData.id),
      },
    });
    setReloading(false);
    if (Object.keys(data?.updateUser?.user).length) {
      reload();
    }
  };

  return (
    <SafeView noBottom loading={loading}>
      {data?.favouritesByUser === null || !data?.favouritesByUser.length ? (
        <NoData reload={() => reload()} reloading={reloading} />
      ) : (
          <>
            <TopStatusBar />
            <FlatList
              key={(item) => String(item.id)}
              data={data?.favouritesByUser}
              renderItem={({ item }) => (
                <Offer data={{ ...item, is_favourite: true }} favourites={() => reload()} />
              )}
              initialNumToRender={6}
              contentContainerStyle={styles.flatlist}
              refreshing={reloading}
              onRefresh={() => reload()}
              removeClippedSubviews={true}
            />
            <View style={styles.clearButton}>
              <Button
                icon="broom"
                status="danger"
                onPress={() => handleClearAll()}
                loading={reloading}
              >
                {t('clear_all')}
              </Button>
            </View>
          </>
        )}
    </SafeView>
  );
};

export default IsLoggedIn(Favourites);