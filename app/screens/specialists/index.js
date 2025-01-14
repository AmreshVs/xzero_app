import React, { createRef, useState, memo } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import TopNavigator from 'components/topNavigator';
import NoData from 'components/noData';
import SafeView from 'components/safeView';
import SearchModal from 'components/searchModal';
import FloatingButton from 'components/floatingButton';
import ModalSearchHeader from 'components/modalSearchHeader';
import { ToastMsg } from 'components/toastMsg';
import { isTab } from 'constants/commonFunctions';
import { ANIM_COMPONENT_DELAY } from 'constants/common';
import { SPECIALISTS } from 'navigation/routes';
import { SPECIALISTS_BY_CENTER } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { FadeInUpAnim } from 'animation';
import Specialist from './specialist';
import styles from './styles';


const Specialists = () => {
  let initialWhereCondition = {
    _limit: -1
  };
  let headerCondition = 1;

  const [reloading, setReloading] = useState(false);
  const { logError } = useErrorLog();
  const { params } = useRoute();

  if (params?.id) {
    initialWhereCondition = {
      ...initialWhereCondition,
      category: Number(params?.id),
    };
    headerCondition = 2;
  }

  const [whereCondition, setWhereCondition] = useState(initialWhereCondition);
  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const modalizeRef = createRef();

  let { data, loading, refetch: _refetch, error } = useQuery(SPECIALISTS_BY_CENTER, {
    variables: {
      where: whereCondition,
    },
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: SPECIALISTS,
      module: 'Get All Specialists',
      input: JSON.stringify(whereCondition),
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
              renderItem={({ item, index }) => (
                <FadeInUpAnim delay={index * ANIM_COMPONENT_DELAY}>
                  <Specialist data={item} />
                </FadeInUpAnim>
              )}
              initialNumToRender={6}
              maxToRenderPerBatch={10}
              windowSize={10}
              numColumns={isTab() ? 2 : 1}
              columnWrapperStyle={isTab() ? styles.specialists : null}
              contentContainerStyle={styles.flatlist}
              refreshing={reloading}
              onRefresh={reload}
              ListHeaderComponent={
                Object.values(whereCondition)[headerCondition] && <ModalSearchHeader handleClear={handleClear} searched={Object.values(whereCondition)[headerCondition]} marginTop={10} />
              }
            />
          )}
        <FloatingButton handlePress={handleModalOpen} />
      </SafeView>
      <SearchModal
        heading={t('search_specialist')}
        placeholder={t('search_specialist_textbox')}
        searched={Object.values(whereCondition)[headerCondition] || ''}
        modalizeRef={modalizeRef}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default memo(Specialists);