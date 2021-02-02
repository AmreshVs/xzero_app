import React, { useState, memo } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery, useApolloClient } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Offer from 'screens/offers/offer';
import NoData from 'components/noData';
import SafeView from 'components/safeView';
import Button from 'components/button';
import TopNavigator from 'components/topNavigator';
import { ToastMsg } from 'components/toastMsg';
import { getAuthenticationHeader, isTab, useReduxAction } from 'constants/commonFunctions';
import { CLEAR_FAVOURITES } from 'graphql/mutations';
import { FAVOURITES_BY_USER } from 'graphql/queries';
import { FAVOURITES_TAB_SCREEN } from 'navigation/routes';
import IsLoggedIn from 'hoc/isLoggedIn';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';
import { FadeInUpAnim } from 'animation';
import { ANIM_COMPONENT_DELAY } from 'constants/common';

const Favourites = ({ navigation }) => {
  const { t } = useTranslation();
  const [reloading, setReloading] = useState(false);
  const userData = useReduxAction(state => state?.userReducer?.user);
  const client = useApolloClient();
  const { logError } = useErrorLog();
  const insets = useSafeAreaInsets();

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
        ...getAuthenticationHeader(userData?.jwt)
      });
      setReloading(false);
      if (data?.ClearAllFavourites === true) {
        reload();
      }
    }
    catch (error) {
      // console.log('Clear Favourites error', error);
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
    <SafeView loading={loading} topNav>
      <TopNavigator
        leftIconName="bars"
        leftClick={() => navigation.toggleDrawer()}
        title={t('favourites')}
        gradient
      />
      {data?.favouritesByUser === null || !data?.favouritesByUser?.length ? (
        <NoData reload={() => reload()} reloading={reloading} topNav />
      ) : (
          <>
            <FlatList
              key={(item) => String(item.id)}
              data={data?.favouritesByUser}
              renderItem={({ item, index }) => (
                <FadeInUpAnim delay={index * ANIM_COMPONENT_DELAY}>
                  <Offer data={{ ...item, is_favourite: true }} favourites={() => reload()} />
                </FadeInUpAnim>
              )}
              numColumns={isTab() ? 2 : 1}
              columnWrapperStyle={isTab() ? styles.columnWrapper : null}
              initialNumToRender={6}
              contentContainerStyle={styles.flatlist}
              refreshing={reloading}
              onRefresh={() => reload()}
            />
            <View style={[styles.clearButton, { marginBottom: insets.bottom ? insets.bottom - 5 : 10 }]}>
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