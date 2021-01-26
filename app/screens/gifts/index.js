import React, { memo } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import NoMembership from 'components/noMembership';
import Box from 'components/box';
import { getAuthenticationHeader, useReduxAction } from 'constants/commonFunctions';
import IsLoggedIn from 'hoc/isLoggedIn';
import { GET_GIFTS } from 'graphql/queries';
import { GIFTS } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import IsVerified from 'hoc/isVerified';
import AvailableGifts from './availableGifts';
import AvailedGifts from './availedGifts';
import GenerateGift from './generateGift';

const Gifts = () => {
  const { t } = useTranslation();
  const { logError } = useErrorLog();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { params } = useRoute();
  const navigation = useNavigation();

  const { data, loading, refetch: _refetch, error } = useQuery(GET_GIFTS, {
    variables: {
      membership_plan: Number(userData?.membership?.package?.id) || null,
      user_id: Number(userData?.id),
    },
    ...getAuthenticationHeader(userData?.jwt),
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    console.log('Gifts Error', error);
    logError({
      screen: GIFTS,
      module: 'Gifts Query',
      input: '',
      error: JSON.stringify(error)
    });
  }

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator
        title={t('gifts')}
        leftIconName={params?.drawer && 'bars'}
        leftClick={() => params?.drawer ? navigation.toggleDrawer() : navigation.pop()}
        gradient
      />
      {userData?.membership === null ?
        <Box padding={10}>
          <NoMembership />
        </Box>
        :
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={_refetch} />} removeClippedSubviews={true} >
          <GenerateGift generated={data?.memberships[0]?.is_gift_generated} refetch={_refetch} />
          <AvailableGifts data={data?.AvailableGifts?.gifts} />
          {data?.AvailableGifts?.AvailedGifts.length > 0 && <AvailedGifts data={data?.AvailableGifts?.AvailedGifts} />}
        </ScrollView>
      }
    </SafeView>
  );
}

export default memo(IsLoggedIn(IsVerified(Gifts)));