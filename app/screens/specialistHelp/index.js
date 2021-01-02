import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import SafeView from 'components/safeView';
import { ToastMsg } from 'components/toastMsg';
import { isTab } from 'constants/commonFunctions';
import useErrorLog from 'hooks/useErrorLog';
import { CATEGORIES } from 'graphql/queries';
import { SPECIALIST_HELP } from 'navigation/routes';
import Categories from './categories';
import styles from './styles';

const SpecialistHelp = () => {
  const [reloading, setReloading] = useState(false);
  const { params } = useRoute();
  const { t } = useTranslation();
  const { logError } = useErrorLog();

  let { data, loading, refetch: _refetch, error } = useQuery(CATEGORIES);

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: SPECIALIST_HELP,
      module: 'Specialist Help',
      input: '',
      error: JSON.stringify(error)
    });
  }

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  };

  return (
    <SafeView loading={loading} topNav>
      <TopNavigator title={params?.title} gradient />
      {!data?.categoriesWithCenterCount.length ? (
        <NoData topNav />
      ) : (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={data?.categoriesWithCenterCount}
            renderItem={({ item }) => <Categories data={item} />}
            numColumns={isTab() ? 4 : 2}
            initialNumToRender={6}
            columnWrapperStyle={styles.centers}
            contentContainerStyle={styles.flatlist}
            refreshing={reloading}
            onRefresh={reload}
            removeClippedSubviews={true}
          />
        )}
    </SafeView>
  );
}

export default memo(SpecialistHelp);