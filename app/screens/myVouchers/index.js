import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import VoucherList from './voucherList';
import styles from './styles';
import Row from 'components/row';
import Box from 'components/box';
import Loader from 'components/loader';
import RippleFX from 'components/rippleFx';
import { useApolloClient } from '@apollo/client';
import { MY_VOUCHER_BOUGHT, MY_VOUCHER_WON } from 'graphql/queries';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import NoData from 'components/noData';
import { isTab } from 'constants/commonFunctions';

export default function MyVouchers() {
  const [reloading, setReloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(0);
  const [data, setData] = useState([]);
  const { userData } = useContext(UserDataContext);
  const client = useApolloClient();
  const { t } = useTranslation();

  const reload = async () => {
    setReloading(true);
    handlePress(select);
    setReloading(false);
  };

  useEffect(() => {
    handlePress(0);
  }, []);

  const tab = [
    { id: 0, name: t('bought') },
    { id: 1, name: t('won') },
  ];

  const handlePress = async (tab) => {
    setSelect(tab);
    setLoading(true);
    const { data } = await client.query({
      query: !tab ? MY_VOUCHER_BOUGHT : MY_VOUCHER_WON,
      variables: {
        user_id: Number(userData?.id)
      }
    });
    setData(data?.voucherAvaileds);
    setLoading(false);
  }

  return (
    <SafeView topNav>
      <TopNavigator title={t('my_vouchers')} gradient />
      <Row>
        {tab.map((item, index) => (
          <RippleFX style={[styles.textContainer, select === item?.id ? styles.selectedBorder : {}]} onPress={() => handlePress(item?.id)} key={index}>
            <Text style={[styles.text, select === item?.id ? styles.selectedText : {}]}>{item?.name}</Text>
          </RippleFX>
        ))}
      </Row>
      {loading
        ?
        (
          <Box height="90%">
            <Loader />
          </Box>
        )
        :
        data.length <= 0 ?
          <Box>
            <NoData reload={() => reload()} />
          </Box>
          :
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={data}
            renderItem={({ item }) => <VoucherList data={item} />}
            initialNumToRender={6}
            maxToRenderPerBatch={10}
            windowSize={10}
            numColumns={isTab() ? 2 : 1}
            columnWrapperStyle={isTab() ? styles.vouchers : null}
            contentContainerStyle={styles.flatlist}
            refreshing={reloading}
            onRefresh={() => reload()}
            removeClippedSubviews={true}
          />
      }
    </SafeView>
  )
}

