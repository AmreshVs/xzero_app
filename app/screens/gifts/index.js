import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import AvailableGifts from './availableGifts';
import AvailedGifts from './availedGifts';
import GenerateGift from './generateGift';
import { GET_GIFTS } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { GIFTS } from 'navigation/routes';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import { useRoute } from '@react-navigation/native';
import IsLoggedIn from 'hoc/isLoggedIn';
import { memo } from 'react';

const Gifts = () => {
  const { t } = useTranslation();
  const { logError } = useErrorLog();
  const { userData } = useContext(UserDataContext);
  const { params } = useRoute();

  const { data, loading, refetch: _refetch, error } = useQuery(GET_GIFTS, {
    variables: {
      membership_plan: Number(userData?.membership?.package?.id) || undefined
    }
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: GIFTS,
      module: 'Gifts Query',
      input: '',
      error: JSON.stringify(error)
    });
  }

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={t('gifts')} gradient leftIcon={params?.drawer ? false : true} />
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={_refetch} />} removeClippedSubviews={true} >
        <GenerateGift />
        <AvailableGifts data={data?.AvailableGifts?.gifts} />
        {data?.AvailableGifts?.AvailedGifts.length > 0 && <AvailedGifts data={data?.AvailableGifts?.AvailedGifts} />}
      </ScrollView>
    </SafeView>
  );
}

export default memo(IsLoggedIn(Gifts));