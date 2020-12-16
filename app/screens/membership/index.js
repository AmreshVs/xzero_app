import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, RefreshControl, Text, View } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import Note from './note';
import MembershipCard from './membershipCard';
import Renew from './renew';
import Benefits from './benefits';
import BuyMembership from './buyMembership';
import QRCode from './qrcode';
import { dateDiffInDays, isTab } from 'constants/commonFunctions';
import { GET_MEMBERSHIP_BY_USER, MEMBERSHIP_PLANS } from 'graphql/queries';
import IsLoggedIn from 'hoc/isLoggedIn';
import TopStatusBar from 'components/topStatusBar';
import GetHelp from './getHelp';
import styles from './styles';
import Card from 'components/card';
import Box from 'components/box';
import ApplyPromocode from 'components/applyPromocode';
import Button from 'components/button';
import Plan from './plan';
import { MEMBERSHIP_TAB_SCREEN, PAYMENT } from 'navigation/routes';
import { SCREEN_HEIGHT } from 'constants/common';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';

let expiryMonth = null;
let currentMonth = null;
let expiryYear = null;
let currentYear = null;
let numOfDays = null;
let render = 0;

const Membership = () => {
  const [member, setMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [note, setNote] = useState([]);
  const [planData, setPlanData] = useState({ index: 0 });
  const modalizeRef = useRef(null);
  const client = useApolloClient();
  const { data: membershipPlansData } = useQuery(MEMBERSHIP_PLANS);
  const [promocodeData, setPromocodeData] = useState({ discountedPrice: firstPlanPrice || 0 });
  const { push } = useNavigation();
  const { userData } = useContext(UserDataContext);
  const { t, i18n } = useTranslation();
  const { logError } = useErrorLog();
  let language = i18n.language;

  let firstPlanPrice = membershipPlansData?.membershipPlans[0].price;

  if (firstPlanPrice !== undefined && render === 0) {
    setPromocodeData({ discountedPrice: firstPlanPrice });
    setPlanData({ ...planData, data: membershipPlansData?.membershipPlans[0] });
    render = 1;
  }

  useEffect(() => {
    getMemberData();
  }, []);

  const getMemberData = async () => {
    let { data, error } = await client.query({
      query: GET_MEMBERSHIP_BY_USER,
      variables: {
        user_id: Number(userData?.id),
      },
      context: {
        headers: {
          authorization: 'Bearer ' + userData?.jwt,
        },
      },
    });

    if (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: MEMBERSHIP_TAB_SCREEN,
        module: 'Get membership by user',
        input: JSON.stringify({ user_id: Number(userData?.id), authorization: 'Bearer ' + userData?.jwt }),
        error: JSON.stringify(error)
      });
    }

    setNote({
      info: data?.membershipCardInfo,
      benefits: data?.membershipBenefit,
      membershipData: data?.basicMembershipAmount,
    });
    if (data?.memberships.length) {
      setMember(true);
      setMemberData(data.memberships[0]);
    }
    setLoading(false);
  };

  const reload = async () => {
    if (userData?.jwt !== '' && userData?.jwt !== null) {
      setReloading(true);
      setLoading(true);
      setMember(false);
      setMemberData([]);
      getMemberData();
      setReloading(false);
    }
  };

  const handleBuy = () => {
    if (modalizeRef?.current) {
      modalizeRef.current?.open();
    }
  };

  const confirmBuy = () => {
    push(PAYMENT, { ...note.membershipData, amount: promocodeData?.discountedPrice, plan: planData?.data?.id, promocode: promocodeData?.codeApplied });
  };

  expiryMonth = new Date(memberData?.expiry).getMonth() + 1;
  currentMonth = new Date().getMonth() + 1;
  expiryYear = new Date(memberData?.expiry).getFullYear();
  currentYear = new Date().getFullYear();
  numOfDays = null;
  if (expiryMonth === currentMonth && currentYear === expiryYear) {
    numOfDays = dateDiffInDays(new Date(), new Date(memberData?.expiry));
  }

  return (
    <SafeView style={styles.safeContainer} noBottom loading={loading}>
      <TopStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={reloading} onRefresh={reload} />}
        removeClippedSubviews={true}
      >
        <MembershipCard
          member={member}
          data={memberData}
          expired={member && numOfDays !== null && numOfDays <= 0}
        />
        <Note data={note?.info} />
        <Box flexDirection={isTab() ? "row-reverse" : "column"} >
          {member && <QRCode data={memberData} />}
          <Benefits data={note?.benefits} />
        </Box>
        <Box flexDirection={isTab() ? "row-reverse" : "column"} >
          {member && numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? (
            <Renew membershipData={note.membershipData} />
          ) : null}
          {member && numOfDays !== null && numOfDays <= 0 ? (
            <Renew membershipData={note.membershipData} expired />
          ) : null}
          {!member && <BuyMembership handleBuy={handleBuy} membershipData={note.membershipData} />}
          {!member || numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? <GetHelp /> : null}
        </Box>
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        childrenStyle={styles.modal}
        modalTopOffset={isTab() ? SCREEN_HEIGHT / 2 : SCREEN_HEIGHT / 3}
        snapPoint={SCREEN_HEIGHT / 2}
        scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
        FooterComponent={
          <View style={styles.footer}>
            <Button onPress={confirmBuy}>{t('buy_membership')} - {promocodeData?.discountedPrice || firstPlanPrice} {t('aed')}</Button>
          </View>
        }
      >
        <Box padding={10} paddingBottom={0}>
          <Text style={styles.planTitle}>{t('membership_plans')}</Text>
        </Box>
        <Box style={styles.plansContainer}>
          {membershipPlansData?.membershipPlans && membershipPlansData?.membershipPlans.map((plan, index) => {
            return (
              <Plan
                data={plan}
                index={index}
                planIndex={planData?.index}
                setPlanData={setPlanData}
                setPromocodeData={setPromocodeData}
                key={index}
              />
            )
          })}
        </Box>
        <Box style={styles.tabWrapper}>
          <Card style={styles.membershipBenefits} margin={10} marginBottom={0}>
            <Text style={styles.planTitle}>{`${planData?.data?.[`name_${language}`] || membershipPlansData?.membershipPlans[0]?.[`name_${language}`]} ${t('benefits')}`}</Text>
            <Text style={styles.caption}>{planData?.data?.[`desc_${language}`] || membershipPlansData?.membershipPlans[0]?.[`desc_${language}`]}</Text>
          </Card>
          <Card style={styles.promocode} margin={10}>
            <ApplyPromocode
              voucherPrice={Number(promocodeData?.discountedPrice || firstPlanPrice)}
              plan={planData?.data?.id}
              promocodeData={promocodeData}
              setPromocodeData={setPromocodeData}
            />
          </Card>
        </Box>
      </Modalize>
    </SafeView>
  );
};

export default IsLoggedIn(Membership);