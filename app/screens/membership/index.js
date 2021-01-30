import React, { useState, useEffect, useRef, memo } from 'react';
import { ScrollView, RefreshControl, Text, View } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Card from 'components/card';
import Box from 'components/box';
import ApplyPromocode from 'components/applyPromocode';
import Button from 'components/button';
import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import { ToastMsg } from 'components/toastMsg';
import { getAuthenticationHeader, isTab, useReduxAction, userVerified } from 'constants/commonFunctions';
import { SCREEN_HEIGHT } from 'constants/common';
import useErrorLog from 'hooks/useErrorLog';
import IsLoggedIn from 'hoc/isLoggedIn';
import { GET_MEMBERSHIP_BY_USER, MEMBERSHIP_PLANS } from 'graphql/queries';
import { MEMBERSHIP_TAB_SCREEN, PAYMENT } from 'navigation/routes';
import { SetUserData } from 'redux/actions';
import IsVerified from 'hoc/isVerified';
import { FadeInLeftAnim, FadeInUpAnim, ScaleAnim } from 'animation';
import GetHelp from './getHelp';
import Plan from './plan';
import Note from './note';
import MembershipCard from './membershipCard';
import Renew from './renew';
import Benefits from './benefits';
import BuyMembership from './buyMembership';
import QRCode from './qrcode';
import styles from './styles';

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
  const [promocodeData, setPromocodeData] = useState({ discountedPrice: firstPlanPrice || 0 });
  const { push, toggleDrawer } = useNavigation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { t, i18n } = useTranslation();
  const { logError } = useErrorLog();
  const dispatch = useDispatch();
  let language = i18n.language;

  const { data: membershipPlansData } = useQuery(MEMBERSHIP_PLANS);

  let firstPlanPrice = membershipPlansData?.membershipPlans[0]?.price;

  const defaultData = () => {
    setPromocodeData({ discountedPrice: firstPlanPrice });
    setPlanData({ ...planData, data: membershipPlansData?.membershipPlans[0] });
    render = 1;
  }

  if (firstPlanPrice !== undefined && render === 0) {
    defaultData();
  }

  useEffect(() => {
    getMemberData();
  }, []);

  const getMemberData = async () => {

    let { data, error } = await client.query({
      query: GET_MEMBERSHIP_BY_USER,
      variables: {
        user_id: Number(userData?.id),
        user: Number(userData?.id),
      },
      ...getAuthenticationHeader(userData?.jwt),
    });

    if (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: MEMBERSHIP_TAB_SCREEN,
        module: 'Get membership by user',
        input: JSON.stringify({
          user_id: Number(userData?.id),
          authorization: 'Bearer ' + userData?.jwt
        }),
        error: JSON.stringify(error)
      });
    }

    setNote({
      info: data?.membershipCardInfo,
      benefits: data?.membershipBenefit,
      membershipData: data?.basicMembershipAmount,
    });

    if (data?.memberships?.length) {
      setMember(true);
      setMemberData({ ...data?.memberships[0], ...data?.getMembershipExpiryDays });

      if (userData?.membership === null && userData?.membership?.serial !== data?.memberships[0].serial) {
        dispatch(SetUserData({
          ...userData,
          membership: data?.memberships[0]
        }));
      }
    }

    if ((data?.memberships === null || data?.memberships?.length === 0) && userData?.membership !== null) {
      dispatch(SetUserData({
        ...userData,
        membership: data?.memberships[0]
      }));
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

  const confirmBuy = async () => {
    if (await userVerified()) {
      push(PAYMENT, {
        ...note.membershipData,
        amount: promocodeData?.discountedPrice,
        plan: planData?.data?.id,
        promocode: promocodeData?.codeApplied,
        discount: promocodeData?.discount
      });
    }
  };

  numOfDays = memberData?.diffDays || null;

  return (
    <SafeView style={styles.safeContainer} noBottom loading={loading}>
      <TopNavigator
        title={t('my_membership')}
        leftIconName="bars"
        leftClick={() => toggleDrawer()}
        gradient
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={reloading} onRefresh={reload} />}
      >
        <FadeInUpAnim>
          <MembershipCard
            member={member}
            data={memberData}
            expired={member && numOfDays !== null && numOfDays <= 0}
          />
        </FadeInUpAnim>
        <FadeInUpAnim delay={200}>
          <Note data={note?.info} />
        </FadeInUpAnim>
        <Box flexDirection={isTab() ? "row-reverse" : "column"} >
          {member && (
            <FadeInUpAnim delay={300}>
              <QRCode data={memberData} />
            </FadeInUpAnim>
          )}
          <FadeInUpAnim delay={400}>
            <Benefits member={member} data={note?.benefits} />
          </FadeInUpAnim>
        </Box>
        <Box flexDirection={isTab() ? "row-reverse" : "column"} >
          {member && numOfDays !== null && numOfDays >= 0 && numOfDays < 10 ? (
            <FadeInUpAnim delay={500}>
              <Renew membershipData={note.membershipData} />
            </FadeInUpAnim>
          ) : null}
          {member && numOfDays !== null && numOfDays <= 0 ? (
            <FadeInUpAnim delay={500}>
              <Renew membershipData={note.membershipData} expired />
            </FadeInUpAnim>
          ) : null}
          {!member && (
            <FadeInUpAnim delay={500}>
              <BuyMembership handleBuy={handleBuy} membershipData={note.membershipData} />
            </FadeInUpAnim>
          )}
          {!member || numOfDays !== null && numOfDays < 10 ? (
            <FadeInUpAnim delay={500}>
              <GetHelp />
            </FadeInUpAnim>
          ) : null}
        </Box>
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        childrenStyle={styles.modal}
        modalTopOffset={isTab() ? SCREEN_HEIGHT / 2 : 100}
        scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
        onClose={() => defaultData()}
        FooterComponent={
          <ScaleAnim style={styles.footer}>
            <Button onPress={confirmBuy}>{promocodeData?.discountedPrice === 0 ? t('free') : `${t('buy_membership')} - ${promocodeData?.discountedPrice || firstPlanPrice} ${t('aed')}`}</Button>
          </ScaleAnim>
        }
      >
        <Box padding={10} paddingBottom={0}>
          <Text style={styles.planTitle}>{t('membership_plans')}</Text>
        </Box>
        <Box style={styles.plansContainer}>
          {membershipPlansData?.membershipPlans && membershipPlansData?.membershipPlans.map((plan, index) => {
            return (
              <FadeInLeftAnim delay={index * 100} key={index}>
                <Plan
                  data={plan}
                  index={index}
                  planIndex={planData?.index}
                  setPlanData={setPlanData}
                  setPromocodeData={setPromocodeData}
                />
              </FadeInLeftAnim>
            )
          })}
        </Box>
        <Box style={styles.tabWrapper}>
          <FadeInLeftAnim delay={600}>
            <Card style={styles.membershipBenefits} margin={10} marginBottom={0}>
              <Text style={styles.planTitle}>{`${planData?.data?.[`name_${language}`] || membershipPlansData?.membershipPlans[0]?.[`name_${language}`]} ${t('benefits')}`}</Text>
              <Text style={styles.caption}>{planData?.data?.[`desc_${language}`] || membershipPlansData?.membershipPlans[0]?.[`desc_${language}`]}</Text>
            </Card>
          </FadeInLeftAnim>
          <FadeInLeftAnim delay={600}>
            <Card style={styles.promocode} margin={10}>
              <ApplyPromocode
                voucherPrice={Number(promocodeData?.discountedPrice || firstPlanPrice)}
                plan={planData?.data?.id}
                promocodeData={promocodeData}
                setPromocodeData={setPromocodeData}
              />
            </Card>
          </FadeInLeftAnim>
        </Box>
      </Modalize>
    </SafeView>
  );
};

export default memo(IsLoggedIn(IsVerified(Membership)));