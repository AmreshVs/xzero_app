import React, { useEffect, useState, memo, useContext } from 'react';
import { FlatList, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Row from 'components/row';
import Box from 'components/box';
import Loader from 'components/loader';
import RippleFX from 'components/rippleFx';
import { ToastMsg } from 'components/toastMsg';
import NoData from 'components/noData';
import { getAuthenticationHeader, isTab } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import IsLoggedIn from 'hoc/isLoggedIn';
import useErrorLog from 'hooks/useErrorLog';
import { MY_VOUCHERS } from 'navigation/routes';
import { MY_VOUCHER_BOUGHT, MY_VOUCHER_WON } from 'graphql/queries';
import VoucherList from './voucherList';
import styles from './styles';

const MyVouchers = () => {
  const [reloading, setReloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(0);
  const [data, setData] = useState([]);
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const client = useApolloClient();
  const { t } = useTranslation();
  const navigation = useNavigation();

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
    const { data, error } = await client.query({
      query: !tab ? MY_VOUCHER_BOUGHT : MY_VOUCHER_WON,
      variables: {
        user_id: Number(userData?.id)
      },
      ...getAuthenticationHeader(userData?.jwt)
    });

    if (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: MY_VOUCHERS,
        module: 'Get bought or won vouchers list',
        input: JSON.stringify({
          user_id: Number(userData?.id)
        }),
        error: JSON.stringify(error)
      });
    }

    setData(data?.voucherAvaileds);
    setLoading(false);
  }

  return (
    <SafeView topNav>
      <TopNavigator
        leftIconName="bars"
        leftClick={() => navigation.toggleDrawer()}
        title={t('my_vouchers')}
        gradient
      />
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
        data?.length <= 0 ?
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
          />
      }
    </SafeView>
  )
}

export default memo(IsLoggedIn(MyVouchers));