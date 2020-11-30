import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, RefreshControl, Text, View } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';

import SafeView from 'components/safeView';
import Note from './note';
import MembershipCard from './membershipCard';
import Renew from './renew';
import Benefits from './benefits';
import BuyMembership from './buyMembership';
import QRCode from './qrcode';
import { getJWT, getUserData, dateDiffInDays } from 'constants/commonFunctions';
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
import { PAYMENT } from 'navigation/routes';

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
  const [planData, setPlanData] = useState({ index: 0, selected: [] });
  const modalizeRef = useRef(null);
  const client = useApolloClient();
  const { data: membershipPlansData } = useQuery(MEMBERSHIP_PLANS);
  const [promocodeData, setPromocodeData] = useState({ discountedPrice: firstPlanPrice || 0 });
  const { push } = useNavigation();
  let firstPlanPrice = membershipPlansData?.membershipPlans[0].price;

  if (firstPlanPrice !== undefined && render === 0) {
    setPromocodeData({ discountedPrice: firstPlanPrice });
    render = 1;
  }

  useEffect(() => {
    getMemberData();
  }, []);

  const getMemberData = async () => {
    let jwt = await getJWT();
    let { id } = await getUserData();
    let { data } = await client.query({
      query: GET_MEMBERSHIP_BY_USER,
      variables: {
        user_id: Number(id),
      },
      context: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      },
    });
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
    let jwt = await getJWT();
    if (jwt !== '' && jwt !== null) {
      setReloading(true);
      getMemberData(jwt);
      setReloading(false);
    }
  };

  const handleBuy = () => {
    modalizeRef.current?.open();
  };

  const confirmBuy = () => {
    push(PAYMENT, { ...note.membershipData, amount: promocodeData?.discountedPrice });
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
        {member && <QRCode data={memberData} />}
        <Note data={note?.info} />
        <Benefits data={note?.benefits} />
        {member && numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? (
          <Renew membershipData={note.membershipData} />
        ) : null}
        {member && numOfDays !== null && numOfDays <= 0 ? (
          <Renew membershipData={note.membershipData} expired />
        ) : null}
        {!member && <BuyMembership handleBuy={handleBuy} membershipData={note.membershipData} />}
        {member && numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? <GetHelp /> : null}
      </ScrollView>
      <Modalize ref={modalizeRef} childrenStyle={styles.modal} modalTopOffset={250} scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
        FooterComponent={
          <View style={styles.footer}>
            <Button onPress={confirmBuy}>Buy Membership - {promocodeData?.discountedPrice || firstPlanPrice} AED</Button>
          </View>
        }
      >
        <Box padding={10} paddingBottom={0}>
          <Text style={styles.planTitle}>Membership Plans</Text>
        </Box>
        {membershipPlansData?.membershipPlans && membershipPlansData?.membershipPlans.map((plan, index) => {
          return (
            <Plan data={plan} index={index} planIndex={planData?.index} key={index} setPlanData={setPlanData} setPromocodeData={setPromocodeData} />
          )
        })}
        <Card margin={10}>
          <ApplyPromocode voucherPrice={Number(promocodeData?.discountedPrice || firstPlanPrice)} price={promocodeData?.discountedPrice} promocodeData={promocodeData} setPromocodeData={setPromocodeData} />
        </Card>
      </Modalize>
    </SafeView>
  );
};

export default IsLoggedIn(Membership);