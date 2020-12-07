import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ScrollView, RefreshControl, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

import SafeView from 'components/safeView';
import Slider from './slider';
import Box from 'components/box';
import Heading from 'components/heading';
import Categories from './categories';
import TopSection from './topSection';
import TopCenters from './topCenters';
import { GET_HOME } from 'graphql/queries';
import MembershipBox from './membershipBox';
import styles from './styles';

let openLink = 0;
let backupLink = "";

export default function Home() {
  const { data, loading, refetch } = useQuery(GET_HOME);
  const [reloading, setReloading] = useState(false);
  const { t } = useTranslation();
  let counts = {
    centersCount: data?.centersCount?.aggregate?.totalCount,
    offersCount: data?.offersCount?.aggregate?.totalCount,
  };

  let banners = data?.banners || [];
  let categories = data?.categoriesWithCenterCount || [];
  let topCenters = data?.topCenters || [];

  useEffect(() => {
    openLink = 0;
    Linking.addEventListener('url', deepLinkCallback);

    return () => {
      Linking.removeEventListener('url', console.log('removed'));
    }
  }, []);

  const deepLinkCallback = async (e) => {
    let url = e?.url;
    console.log('deepLink', url);

    if (openLink === 1 && url !== backupLink) {
      openLink = 0;
    }

    if (openLink === 0) {
      backupLink = url;
      if (url.includes('Home/')) {
        url = (url).replace("Home/", "");
      }
      console.log('url', url);
      await Linking.openURL(url);
    }
    openLink = 1;
  }

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

  const Header = () => {
    return (
      <>
        <TopSection data={counts} />
        <MembershipBox data={counts} />
        <Slider data={banners} />
        <Box padding={10}>
          <Heading marginBottom={10}>{t('discover_categories')}</Heading>
          <Categories data={categories} />
        </Box>
        <Box padding={10} paddingVertical={0}>
          <Heading marginBottom={10}>{t('top_offers')}</Heading>
          <TopCenters data={topCenters} />
        </Box>
      </>
    );
  };

  return (
    <SafeView loading={loading} noTop noBottom>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={reloading} onRefresh={reload} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
        <Header />
      </ScrollView>
    </SafeView>
  );
}