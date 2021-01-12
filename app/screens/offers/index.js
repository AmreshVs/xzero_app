import React, { createRef, useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import NoData from 'components/noData';
import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import FloatingButton from 'components/floatingButton';
import SearchModal from 'components/searchModal';
import { ToastMsg } from 'components/toastMsg';
import ModalSearchHeader from 'components/modalSearchHeader';
import { isTab } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { OFFERS_SCREEN } from 'navigation/routes';
import { OFFERS_LIST } from 'graphql/queries';
import Offer from './offer';
import styles from './styles';

export default function Offers() {
  const { params } = useRoute();
  const { logError } = useErrorLog();
  const { userData } = useContext(UserDataContext);

  let initialWhereCondition = {
    _limit: -1
  };
  let headerCondition = 1;

  if (params?.center) {
    initialWhereCondition = {
      ...initialWhereCondition,
      center: Number(params?.center),
    };
    headerCondition = 2;
  }

  const [reloading, setReloading] = useState(false);
  const [whereCondition, setWhereCondition] = useState(initialWhereCondition);
  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const modalizeRef = createRef();

  let { data, loading, refetch: _refetch, error } = useQuery(OFFERS_LIST, {
    variables: {
      where: whereCondition,
      user_id: Number(userData?.id) || 0
    },
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: OFFERS_SCREEN,
      module: 'Get Offers',
      input: JSON.stringify({
        where: whereCondition,
        user_id: Number(userData?.id) || 0,
      }),
      error: JSON.stringify(error)
    });
  }

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  };

  const handleModalOpen = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  }

  const handleSearch = (value) => {
    setWhereCondition({
      ...whereCondition,
      [`title_${language}_contains`]: value
    });
  }

  const handleClear = () => {
    setWhereCondition(initialWhereCondition);
  }

  return (
    <>
      <SafeView loading={loading} topNav>
        <TopNavigator title={t('offers')} gradient />
        {(data?.offerListWithFavourites !== undefined && !data?.offerListWithFavourites.length) || data === {} ? (
          <NoData topNav />
        ) : (
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={data && data?.offerListWithFavourites}
              renderItem={({ item }) => <Offer data={item} center={Number(params?.center)} />}
              initialNumToRender={6}
              maxToRenderPerBatch={10}
              windowSize={10}
              numColumns={isTab() ? 2 : 1}
              contentContainerStyle={styles.flatlist}
              refreshing={reloading}
              onRefresh={reload}
              removeClippedSubviews={true}
              ListHeaderComponent={
                Object.values(whereCondition)[headerCondition] && <ModalSearchHeader handleClear={handleClear} searched={Object.values(whereCondition)[headerCondition] || ""} marginTop={10} />
              }
            />
          )}
        <FloatingButton handlePress={handleModalOpen} />
      </SafeView>
      <SearchModal
        heading={t('search_offer')}
        placeholder={t('search_offer_textbox')}
        searched={Object.values(whereCondition)[headerCondition] || ""}
        modalizeRef={modalizeRef}
        handleSearch={handleSearch}
      />
    </>
  );
}