import React, { useState, useEffect, createRef } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
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
import SearchModal from './searchModal';
import styles from './styles';
import Popup from './popup';
import useErrorLog from 'hooks/useErrorLog';
import { HOME_SCREEN } from 'navigation/routes';

let openLink = 0;
let backupLink = "";
let counts = {};

const Home = () => {
  const { data, loading, refetch: _refetch, error } = useQuery(GET_HOME);
  const [reloading, setReloading] = useState(false);
  const modalizeRef = createRef();
  const { t } = useTranslation();

  const { logError } = useErrorLog();

  if (error) {
    logError({
      screen: HOME_SCREEN,
      module: 'Home Query',
      input: '',
      error: JSON.stringify(error)
    });
  }

  counts = {
    centersCount: data?.centersCount?.aggregate?.totalCount,
    offersCount: data?.offersCount?.aggregate?.totalCount,
    specialistsCount: data?.specialistsCount?.aggregate?.totalCount,
    vouchersCount: data?.vouchersCount?.aggregate?.totalCount,
    giftsCount: data?.giftsCount?.aggregate?.totalCount,
  };

  let banners = data?.banners || [];
  let categories = data?.categoriesWithCenterCount || [];
  let topCenters = data?.topCenters || [];

  useEffect(() => {
    openLink = 0;
    Linking.addEventListener('url', deepLinkCallback);

    return () => {
      Linking.removeEventListener('url');
      openLink = 1;
    }
  }, []);

  const handleModalOpen = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  }

  const deepLinkCallback = async (e) => {
    let url = e?.url;

    if (openLink === 1 && url !== backupLink) {
      openLink = 0;
    }

    if (openLink === 0) {
      backupLink = url;
      if (url.includes('Home/')) {
        url = (url).replace("Home/", "");
      }
      await Linking.openURL(url);
    }

    openLink = 1;
  }

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  };

  const Header = () => {
    return (
      <>
        <TopSection handleModalOpen={handleModalOpen} data={counts} />
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
    <>
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
      <SearchModal
        modalizeRef={modalizeRef}
      />
      <Popup />
    </>
  );
}

export default (Home);