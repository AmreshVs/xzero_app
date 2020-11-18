import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useApolloClient } from '@apollo/client';

import SafeView from 'components/safeView';
import Note from './note';
import MembershipCard from './membershipCard';
import Renew from './renew';
import Benefits from './benefits';
import BuyMembership from './buyMembership';
import QRCode from './qrcode';
import { getJWT, getUserData, dateDiffInDays } from 'constants/commonFunctions';
import { GET_MEMBERSHIP_BY_USER } from 'graphql/queries';
import IsLoggedIn from 'hoc/isLoggedIn';
import TopStatusBar from 'components/topStatusBar';
import GetHelp from './getHelp';
import styles from './styles';

let expiryMonth = null;
let currentMonth = null;
let expiryYear = null;
let currentYear = null;
let numOfDays = null;

const Membership = () => {
  const [member, setMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [note, setNote] = useState([]);
  const client = useApolloClient();

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
        <QRCode data={memberData} />
        <Note data={note?.info} />
        <Benefits data={note?.benefits} />
        {member && numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? (
          <Renew membershipData={note.membershipData} />
        ) : null}
        {member && numOfDays !== null && numOfDays <= 0 ? (
          <Renew membershipData={note.membershipData} expired />
        ) : null}
        {!member && <BuyMembership membershipData={note.membershipData} />}
        {member && numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? <GetHelp /> : null}
      </ScrollView>
    </SafeView>
  );
};

export default IsLoggedIn(Membership);
