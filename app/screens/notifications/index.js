import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import { ToastMsg } from 'components/toastMsg';
import NoData from 'components/noData';
import { useReduxAction } from 'constants/commonFunctions';
import { ANIM_COMPONENT_DELAY } from 'constants/common';
import useErrorLog from 'hooks/useErrorLog';
import { NOTIFICATIONS as NAV_NOTIFICATIONS } from 'navigation/routes';
import { NOTIFICATIONS_BY_USER } from 'graphql/queries';
import { FadeInUpAnim } from 'animation';
import Notification from './notification';
import styles from './styles';

const Notifications = () => {
  const [reloading, setReloading] = useState(false);
  const { logError } = useErrorLog();
  const { t } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);

  const { data, loading, refetch: _refetch, error } = useQuery(NOTIFICATIONS_BY_USER, {
    variables: {
      user_id: Number(userData?.id)
    },
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    // console.log('Notifications Error', error);
    ToastMsg(t('error_occured'));
    logError({
      screen: NAV_NOTIFICATIONS,
      module: 'Get Notifications',
      input: '',
      error: JSON.stringify(error)
    });
  }

  const reload = async () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  };

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={t('notifications')} gradient />
      {!data?.NotificationsByUser.length ? (
        <NoData topNav />
      ) : (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={data?.NotificationsByUser}
            renderItem={({ item, index }) => (
              <FadeInUpAnim delay={index * ANIM_COMPONENT_DELAY}>
                <Notification {...item} />
              </FadeInUpAnim>
            )}
            initialNumToRender={6}
            maxToRenderPerBatch={10}
            windowSize={10}
            contentContainerStyle={styles.flatlist}
            refreshing={reloading}
            onRefresh={reload}
          />
        )}
    </SafeView>
  );
}

export default memo(Notifications);