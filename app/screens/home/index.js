import React, { useState, useEffect, createRef, memo, useContext } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

import SafeView from 'components/safeView';
import Box from 'components/box';
import Heading from 'components/heading';
import Row from 'components/row';
import { GET_HOME } from 'graphql/queries';
import { isTab, useReduxAction } from 'constants/commonFunctions';
import { HOME_SCREEN } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import { FadeInUpAnim } from 'animation';
import ReferCard from './referCard';
import GiftCard from './giftsCard';
import DrawCard from './drawCard';
import Slider from './slider';
import MembershipBox from './membershipBox';
import SearchModal from './searchModal';
import Popup from './popup';
import Categories from './categories';
import TopSection from './topSection';
import TopCenters from './topCenters';
import Stories from './stories';
import styles from './styles';

let openLink = 0;
let backupLink = "";
let counts = {};

const Home = () => {
  const [reloading, setReloading] = useState(false);
  const modalizeRef = createRef();
  const { t } = useTranslation();
  const { logError } = useErrorLog();
  const userData = useReduxAction(state => state?.userReducer?.user);

  const { data, loading, refetch: _refetch, error } = useQuery(GET_HOME, {
    variables: {
      user_id: Number(userData?.id || 0),
      user: Number(userData?.id || 0)
    },
  });

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
      if (url.includes('Main/')) {
        url = (url).replace("Main/", "");
      }
      await Linking.openURL(url);
    }

    openLink = 1;
  }

  const reload = async () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  };

  const Header = () => {
    return (
      <>
        <TopSection notificationCount={data?.notificationCount} handleModalOpen={handleModalOpen} />
        <MembershipBox expiry={data?.user?.membership?.expiry} data={counts} />
        <Slider data={banners} />
        <Box padding={10} paddingBottom={0}>
          <Heading marginBottom={10}>{t('discover_categories')}</Heading>
          <Categories data={categories} />
        </Box>
        <Box flexDirection={isTab() ? 'column-reverse' : 'column'}>
          <Box padding={10} paddingTop={0}>
            <FadeInUpAnim>
              <DrawCard />
            </FadeInUpAnim>
          </Box>
          <Box padding={10} paddingVertical={0}>
            <Heading marginBottom={10}>{t('top_offers')}</Heading>
            <TopCenters data={topCenters} />
          </Box>
        </Box>
        <Row>
          <Box width={isTab() ? '50%' : '100%'} padding={10} paddingTop={0} paddingRight={isTab() ? 0 : 10}>
            <ReferCard />
          </Box>
          <Box width={isTab() ? '50%' : '100%'} padding={10} paddingTop={0}>
            <GiftCard />
          </Box>
        </Row>
        <Box padding={10} paddingTop={0}>
          <Heading marginBottom={10}>Latest Stories</Heading>
          <Stories />
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


export default memo(Home, propsAreEqual);

function propsAreEqual(prevProps, nextProps) {
  return true;
}