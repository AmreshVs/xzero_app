import React, { useRef, useState, memo } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Button from 'components/button';
import NoData from 'components/noData';
import { ToastMsg } from 'components/toastMsg';
import Box from 'components/box';
import { isTab, useReduxAction } from 'constants/commonFunctions';
import useErrorLog from 'hooks/useErrorLog';
import { VOUCHER_DETAIL } from 'graphql/queries';
import { LOGIN_SCREEN, VOUCHER_DETAIL as VOUCHERDETAIL } from 'navigation/routes';
import BuyVoucherModal from './buyVoucherModal';
import AssuredGift from './assuredGift';
import Rules from './rules';
import CenterSymbol from './centerSymbol';
import MembershipPlan from './membershipPlan';
import Help from './help';
import Details from './details';
import VoucherInfo from './voucherInfo';
import Buy from './buy';
import Win from './win';
import styles from './styles';

const VoucherDetail = ({ navigation }) => {
  const [reloading, setReloading] = useState(false);
  const [promocodeData, setPromocodeData] = useState({ discountedPrice: 0 });
  const modalizeRef = useRef(null);
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const { params } = useRoute();
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const queryInput = {
    id: Number(params?.id)
  };

  const { data, loading, refetch: _refetch, error } = useQuery(VOUCHER_DETAIL, {
    variables: queryInput,
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    // console.log('Voucher Detail error', error);
    ToastMsg(t('error_occured'));
    logError({
      screen: VOUCHERDETAIL,
      module: '',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

  const handleOpenModal = async () => {
    if (!userData) {
      navigation.replace(LOGIN_SCREEN);
      return;
    }

    setPromocodeData({ discountedPrice: userData?.membership === null ? data?.voucher?.cost_for_non_members : data?.voucher?.cost });
    modalizeRef.current?.open();

  };

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  }

  const GetProduct = () => {
    if (userData?.membership !== null) {
      return (
        <>
          <Buy data={voucher?.product} />
          <CenterSymbol text={t('you_will_get')} />
        </>
      )
    }
    else {
      return (
        <>
          <MembershipPlan data={voucher?.membership_plans[0]} />
          <CenterSymbol text={t('you_will_get')} />
          {voucher?.product && <Buy member={userData?.membership === null} data={voucher?.product} />}
          <CenterSymbol icon="plus" />
        </>
      )
    }
  }

  let voucher = data?.voucher;

  return (
    <>
      <SafeView loading={loading} topNav>
        <TopNavigator gradient title={data?.voucher?.[`buy_title_${language}`] || t('voucher_detail')} />
        {!data?.voucher ? (
          <NoData topNav />
        ) : (
            <>
              <ScrollView
                style={styles.container}
                refreshing={reloading}
                refreshControl={<RefreshControl refreshing={reloading} onRefresh={() => reload()} />}
                onRefresh={() => reload()}
              >
                <VoucherInfo data={voucher} />
                <Details data={voucher} />
                {voucher?.product?.length > 0 && <GetProduct key={voucher?.product?.length} />}
                {voucher?.assured_gift?.length > 0 && <AssuredGift data={voucher?.assured_gift[0]} />}
                {voucher?.draw_gift?.length > 0 ? (
                  <>
                    {voucher?.assured_gift?.length > 0 && <CenterSymbol icon="plus" />}
                    <Win voucher_id={voucher?.id} draw_status={voucher?.draw_status} data={voucher?.draw_gift} />
                  </>
                ) : <Box marginBottom={10} />}
                <Box
                  justifyContent="space-between"
                  flexDirection={isTab() ? "row" : "column"}
                  marginBottom={['closed', 'publish'].includes(voucher?.draw_status) ? 10 : 0}
                >
                  <Rules data={data?.voucherRule} />
                  {!['closed', 'publish'].includes(voucher?.draw_status) && <Help />}
                </Box>
              </ScrollView>
              {!['closed', 'publish'].includes(voucher?.draw_status) && (
                <View style={styles.buyNowButton}>
                  <Button
                    icon="money-bill"
                    width={isTab() ? "40%" : "100%"}
                    onPress={() => handleOpenModal()}
                  >
                    {t('buy_now')} - {t('aed')} {(!userData || userData?.membership === null) ? voucher?.cost_for_non_members : voucher?.cost}
                  </Button>
                </View>
              )}
            </>
          )}
      </SafeView>
      <BuyVoucherModal modalizeRef={modalizeRef} promocodeData={promocodeData} setPromocodeData={setPromocodeData} voucher={voucher} />
    </>
  )
}

export default memo(VoucherDetail);