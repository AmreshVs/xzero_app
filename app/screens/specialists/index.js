import React, { createRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { SPECIALISTS_BY_CENTER } from 'graphql/queries';
import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import SafeView from 'components/safeView';
import SearchModal from 'components/searchModal';
import FloatingButton from 'components/floatingButton';
import { ModalSearchHeader } from 'components/modalSearchHeader';
import Specialist from './specialist';
import styles from './styles';

export default function SpecialistHelp() {
  const [reloading, setReloading] = useState(false);
  const { params } = useRoute();
  const initialWhereCondition = {
    category: Number(params?.id),
  };
  const [whereCondition, setWhereCondition] = useState(initialWhereCondition);
  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const modalizeRef = createRef();

  let { data, loading, refetch: _refetch } = useQuery(SPECIALISTS_BY_CENTER, {
    variables: {
      where: whereCondition,
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
      [`name_${language}_contains`]: value
    });
  }

  const handleClear = () => {
    setWhereCondition(initialWhereCondition);
  }

  return (
    <>
      <SafeView loading={loading} topNav>
        <TopNavigator title={params?.title} gradient />
        {(data?.specialists !== undefined && !data?.specialists.length) || data === {} ? (
          <NoData topNav />
        ) : (
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={data?.specialists}
              renderItem={({ item }) => <Specialist data={item} />}
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
        heading={t('search_specialist')}
        placeholder={t('search_specialist_textbox')}
        searched={Object.values(whereCondition)[1]}
        modalizeRef={modalizeRef}
        handleSearch={handleSearch}
      />
    </>
  );
}