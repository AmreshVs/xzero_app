import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import Slider from './slider';
import Box from 'components/box';
import Heading from 'components/heading';
import Categories from './categories';
import TopSection from './topSection';
import TopCenters from './topCenters';
import Button from 'components/button';
import Row from 'components/row';
import { GET_HOME } from 'graphql/queries';
import MembershipBox from './membershipBox';
import { GIFTS, VOUCHERS } from 'navigation/routes';

export default function Home({ navigation }) {
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

  const Footer = () => {
    return (
      <Box padding={10} paddingTop={0}>
        <Row spaceBetween>
          <Button icon="ticket-alt" width="48%" onPress={() => navigation.push(VOUCHERS)}>
            {t('vouchers')}
          </Button>
          <Button icon="gifts" width="48%" onPress={() => navigation.push(GIFTS)}>
            {t('gifts')}
          </Button>
        </Row>
      </Box>
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
          <Footer />
        </ScrollView>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    top: -65,
    marginBottom: -65,
  },
});
