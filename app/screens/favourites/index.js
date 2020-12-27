import React, { useState, memo } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery, useApolloClient } from '@apollo/client';

import Offer from 'screens/offers/offer';
import NoData from 'components/noData';
import SafeView from 'components/safeView';
import Button from 'components/button';
import { FAVOURITES_BY_USER } from 'graphql/queries';
import { CLEAR_FAVOURITES } from 'graphql/mutations';
import IsLoggedIn from 'hoc/isLoggedIn';
import TopStatusBar from 'components/topStatusBar';
import styles from './styles';
import { isTab } from 'constants/commonFunctions';
import useErrorLog from 'hooks/useErrorLog';
import { FAVOURITES_TAB_SCREEN } from 'navigation/routes';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import { ToastMsg } from 'components/toastMsg';
import { useNavigation } from '@react-navigation/native';
import TopNavigator from 'components/topNavigator';

const Favourites = () => {
  const { t } = useTranslation();
  const [reloading, setReloading] = useState(false);
  const { userData } = useContext(UserDataContext);
  const client = useApolloClient();
  const { logError } = useErrorLog();
  const navigation = useNavigation();

  const { data, loading, refetch: _refetch, error } = useQuery(FAVOURITES_BY_USER, {
    variables: { user_id: Number(userData?.id) || 0 },
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: FAVOURITES_TAB_SCREEN,
      module: 'Favorites Query',
      input: JSON.stringify({ user_id: Number(userData?.id) || 0 }),
      error: JSON.stringify(error)
    });
  }

  const reload = async () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  };

  const handleClearAll = async () => {
    try {
      setReloading(true);
      const { data } = await client.mutate({
        mutation: CLEAR_FAVOURITES,
        variables: {
          user_id: Number(userData.id),
        },
      });
      setReloading(false);
      if (data?.ClearAllFavourites) {
        reload();
      }
    }
    catch (error) {
      console.log('Clear Favourites error', error);
      ToastMsg(t('error_occured'));
      logError({
        screen: FAVOURITES_TAB_SCREEN,
        module: 'Clear Favorites',
        input: JSON.stringify({
          user_id: Number(userData.id),
        }),
        error: JSON.stringify(error)
      });
    }
  };

  return (
    <SafeView noBottom loading={loading}>
      <TopNavigator
        leftIconName="bars"
        leftClick={() => navigation.toggleDrawer()}
        title={t('favourites')}
        gradient
      />
      {data?.favouritesByUser === null || !data?.favouritesByUser?.length ? (
        <NoData reload={() => reload()} reloading={reloading} />
      ) : (
          <>
            <FlatList
              key={(item) => String(item.id)}
              data={data?.favouritesByUser}
              renderItem={({ item }) => (
                <Offer data={{ ...item, is_favourite: true }} favourites={() => reload()} />
              )}
              numColumns={isTab() ? 2 : 1}
              columnWrapperStyle={isTab() ? styles.columnWrapper : null}
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
                width={isTab() ? '30%' : '100%'}
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

export default memo(IsLoggedIn(Favourites));