import React, { useState, useCallback, createRef } from 'react';
import { FlatList, InteractionManager } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import NoData from 'components/noData';
import TopNavigator from 'components/topNavigator';
import Center from './center';
import { useQuery } from '@apollo/client';
import { GET_CENTERS } from 'graphql/queries';
import FloatingButton from 'components/floatingButton';
import SearchModal from 'components/searchModal';
import ModalSearchHeader from 'components/modalSearchHeader';
import styles from './styles';

let initialWhereCondition = {};
export default function Centers() {
  const { params } = useRoute();

  if (params?.id) {
    initialWhereCondition = {
      category: Number(params?.id) || 0,
    };
  }

  const [reloading, setReloading] = useState(false);
  const [whereCondition, setWhereCondition] = useState(initialWhereCondition);
  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const modalizeRef = createRef();
  let { data, loading, refetch } = useQuery(GET_CENTERS, {
    variables: {
      where: whereCondition
    },
  });

  const _refetch = useCallback(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      if (refetch) await refetch();
    });
    return () => task.cancel();
  }, [reloading]);

  const reload = async () => {
    setReloading(true);
    _refetch();
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
      [`title_${language}_contains`]: value,
      title: value
    });
  }

  const handleClear = () => {
    setWhereCondition(initialWhereCondition);
  }
  console.log(Object.values(whereCondition)[1]);
  return (
    <>
      <SafeView loading={loading} topNav>
        <TopNavigator title={params?.title} gradient />
        {(data?.topCenters !== undefined && !data?.topCenters.length) || data === {} ? (
          <NoData topNav />
        ) : (
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={data?.topCenters}
              renderItem={({ item }) => <Center data={item} />}
              numColumns={2}
              initialNumToRender={6}
              maxToRenderPerBatch={10}
              windowSize={10}
              columnWrapperStyle={styles.centers}
              contentContainerStyle={styles.flatlist}
              refreshing={reloading}
              onRefresh={() => reload()}
              removeClippedSubviews={true}
              ListHeaderComponent={
                Object.values(whereCondition)[1] !== undefined ? <ModalSearchHeader handleClear={handleClear} searched={Object.values(whereCondition)[1] || ""} marginTop={10} /> : null
              }
            />
          )}
        <FloatingButton handlePress={handleModalOpen} />
      </SafeView>
      <SearchModal
        heading={t('search_center')}
        placeholder={t('search_center_textbox')}
        searched={Object.values(whereCondition)[1]}
        modalizeRef={modalizeRef}
        handleSearch={handleSearch}
      />
    </>
  );
}