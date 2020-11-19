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

export default function Gifts() {
  const { t } = useTranslation();
  const { data, loading, refetch: _refetch } = useQuery(GET_GIFTS);

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={t('gifts')} gradient />
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={_refetch} />} >
        <GenerateGift />
        <AvailableGifts data={data?.AvailableGifts?.gifts} />
        {data?.AvailableGifts?.AvailedGifts.length > 0 && <AvailedGifts data={data?.AvailableGifts?.AvailedGifts} />}
      </ScrollView>
    </SafeView>
  );
}