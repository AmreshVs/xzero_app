import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useApolloClient } from '@apollo/client';

import SafeView from 'components/safeView';
import Note from './note';
import MembershipCard from './membershipCard';
import Renew from './renew';
import Benefits from './benefits';
import BuyMembership from './buyMembership';
import { getJWT, getUserData, dateDiffInDays } from 'constants/commonFunctions';
import { GET_MEMBERSHIP_BY_USER } from 'graphql/queries';
import IsLoggedIn from 'hoc/isLoggedIn';
import TopStatusBar from 'components/topStatusBar';
import GetHelp from './getHelp';
import styles from './styles';

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

  let expiryMonth = new Date(memberData?.expiry).getMonth() + 1;
  let currentMonth = new Date().getMonth() + 1;
  let expiryYear = new Date(memberData?.expiry).getFullYear();
  let currentYear = new Date().getFullYear();
  let numOfDays = null;
  if (expiryMonth === currentMonth && currentYear === expiryYear) {
    numOfDays = dateDiffInDays(new Date(), new Date(memberData?.expiry));
  }

  return (
    <SafeView noBottom loading={loading}>
      <TopStatusBar />
      <ScrollView
        style={styles.rootContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={reloading} onRefresh={reload} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
        <MembershipCard
          member={member}
          data={memberData}
          expired={member && numOfDays !== null && numOfDays <= 0}
        />
        <Note data={note?.info} />
        <Benefits data={note?.benefits} />
        {member && numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? (
          <Renew membershipData={note.membershipData} />
        ) : null}
        {member && numOfDays !== null && numOfDays <= 0 ? (
          <Renew membershipData={note.membershipData} expired />
        ) : null}
        {!member && <BuyMembership membershipData={note.membershipData} />}
        <GetHelp />
      </ScrollView>
    </SafeView>
  );
};

export default IsLoggedIn(Membership);
