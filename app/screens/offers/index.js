import React, { createRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import NoData from 'components/noData';
import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Offer from './offer';
import { OFFERS_LIST } from 'graphql/queries';
import styles from './styles';
import FloatingButton from 'components/floatingButton';
import SearchModal from 'components/searchModal';
import { ModalSearchHeader } from 'components/modalSearchHeader';

export default function Offers() {
  const { params: { center, user_id } } = useRoute();
  const initialWhereCondition = {
    center: Number(center),
  };
  const [reloading, setReloading] = useState(false);
  const [whereCondition, setWhereCondition] = useState(initialWhereCondition);
  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const modalizeRef = createRef();

  let { data, loading, refetch: _refetch } = useQuery(OFFERS_LIST, {
    variables: {
      where: whereCondition,
      user_id: Number(user_id) || 0
    },
  });

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
              renderItem={({ item }) => <Offer data={item} />}
              initialNumToRender={6}
              maxToRenderPerBatch={10}
              windowSize={10}
              contentContainerStyle={styles.flatlist}
              refreshing={reloading}
              onRefresh={reload}
              removeClippedSubviews={true}
              ListHeaderComponent={
                Object.values(whereCondition)[1] && <ModalSearchHeader handleClear={handleClear} searched={Object.values(whereCondition)[1]} marginTop={10} />
              }
            />
          )}
        <FloatingButton handlePress={handleModalOpen} />
      </SafeView>
      <SearchModal
        heading={t('search_offer')}
        placeholder={t('search_offer_textbox')}
        searched={Object.values(whereCondition)[1]}
        modalizeRef={modalizeRef}
        handleSearch={handleSearch}
      />
    </>
  );
}