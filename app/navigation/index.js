import React, { useEffect, useRef } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTab from 'components/bottomTab';
import Login from 'screens/login';
import Signup from 'screens/signup';
import Main from 'screens/main';
import Home from 'screens/home';
import Centers from 'screens/centers';
import Offers from 'screens/offers';
import OfferDetail from 'screens/offerDetail';
import Favourites from 'screens/favourites';
import Membership from 'screens/membership';
import User from 'screens/user';
import Payment from 'screens/payment';
import Notifications from 'screens/notifications';
import PaymentStatus from 'screens/paymentStatus';
import SpecialistHelp from 'screens/specialistHelp';
import Specialists from 'screens/specialists';
import SpecialistDetail from 'screens/specialistDetail';
import Privacy from 'screens/privacy';
import Terms from 'screens/terms';
import ForgotPassword from 'screens/forgotPassword';
import Gifts from 'screens/gifts';
import Vouchers from 'screens/vouchers';
import NewUpdate from 'screens/newUpdate';
import VoucherDetail from 'screens/voucherDetail';
import MyVouchers from 'screens/myVouchers';
import Refer from 'screens/refer';
import {
  LOGIN_SCREEN,
  HOME_SCREEN,
  SIGNUP_SCREEN,
  CENTERS_SCREEN,
  MAIN_SCREEN,
  HOME_TAB_SCREEN,
  FAVOURITES_TAB_SCREEN,
  MEMBERSHIP_TAB_SCREEN,
  PROFILE_TAB_SCREEN,
  OFFERS_SCREEN,
  OFFER_DETAIL,
  NOTIFICATIONS,
  PAYMENT,
  PAYMENT_STATUS,
  SPECIALIST_HELP,
  SPECIALISTS,
  SPECIALIST_DETAIL,
  DRAWER_HOME,
  DRAWER_PRIVACY,
  DRAWER_TERMS,
  FORGOT_PASSWORD,
  GIFTS,
  VOUCHERS,
  NEW_UPDATE,
  VOUCHER_DETAIL,
  MY_VOUCHERS,
  REFER,
  OFFLINE,
  OTP,
  INTRO,
  NEWS,
  NEWS_DETAIL,
} from './routes';
import Offline from 'screens/offline';
import CustomDrawer from 'components/drawer';
import Otp from 'screens/otp';
import Intro from 'screens/intro';
import AppLoader from 'components/appLoader';
import News from 'screens/news';
import NewsDetail from 'screens/newsDetail';

const Tab = createBottomTabNavigator();

function HomeNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTab {...props} />}
    >
      <Tab.Screen name={HOME_TAB_SCREEN} component={Home} />
      <Tab.Screen name={NEWS} component={News} options={{ unmountOnBlur: true }} />
      <Tab.Screen name={MEMBERSHIP_TAB_SCREEN} component={Membership} options={{ unmountOnBlur: true }} />
      <Tab.Screen name={VOUCHERS} component={Vouchers} options={{ unmountOnBlur: true }} />
      <Tab.Screen name={PROFILE_TAB_SCREEN} component={User} options={{ unmountOnBlur: true }} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName={MAIN_SCREEN} headerMode="none">
      <Stack.Screen name={MAIN_SCREEN} component={Main} />
      <Stack.Screen name={HOME_SCREEN} component={HomeNavigation} />
      <Stack.Screen name={LOGIN_SCREEN} component={Login} />
      <Stack.Screen name={SIGNUP_SCREEN} component={Signup} />
      <Stack.Screen name={CENTERS_SCREEN} component={Centers} />
      <Stack.Screen name={OFFERS_SCREEN} component={Offers} />
      <Stack.Screen name={OFFER_DETAIL} component={OfferDetail} />
      <Stack.Screen name={NOTIFICATIONS} component={Notifications} />
      <Stack.Screen name={PAYMENT} component={Payment} />
      <Stack.Screen name={PAYMENT_STATUS} component={PaymentStatus} />
      <Stack.Screen name={SPECIALIST_HELP} component={SpecialistHelp} />
      <Stack.Screen name={SPECIALISTS} component={Specialists} />
      <Stack.Screen name={SPECIALIST_DETAIL} component={SpecialistDetail} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={GIFTS} component={Gifts} />
      <Stack.Screen name={VOUCHERS} component={Vouchers} />
      <Stack.Screen name={NEW_UPDATE} component={NewUpdate} />
      <Stack.Screen name={VOUCHER_DETAIL} component={VoucherDetail} />
      <Stack.Screen name={MY_VOUCHERS} component={MyVouchers} />
      <Stack.Screen name={REFER} component={Refer} />
      <Stack.Screen name={OFFLINE} component={Offline} />
      <Stack.Screen name={OTP} component={Otp} />
      <Stack.Screen name={INTRO} component={Intro} />
      <Stack.Screen name={NEWS} component={News} />
      <Stack.Screen name={NEWS_DETAIL} component={NewsDetail} />
      <Stack.Screen name={FAVOURITES_TAB_SCREEN} component={Favourites} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const prefix = ['xzero://'];

export const offlineReset = (navigation) => {
  navigation?.navigate(HOME_SCREEN);
  const resetAction = CommonActions.reset({
    index: -1,
    routes: [{ name: OFFLINE }],
  });
  navigation?.dispatch(resetAction);
}

function Navigation({ connection }) {
  const navigationRef = useRef();
  const linking = {
    prefixes: prefix,
  };

  useEffect(() => {
    if (navigationRef?.current) {
      if (connection === false) {
        offlineReset(navigationRef?.current);
      }
    }
  }, [connection]);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      fallback={<AppLoader />}
    >
      <Drawer.Navigator
        initialRouteName={DRAWER_HOME}
        drawerType="slide"
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{ gestureEnabled: connection }}
      >
        <Drawer.Screen name={DRAWER_HOME} component={StackNavigation} />
        <Drawer.Screen name={MY_VOUCHERS} component={MyVouchers} options={{ unmountOnBlur: true }} />
        <Drawer.Screen name={REFER} component={Refer} options={{ unmountOnBlur: true }} />
        <Drawer.Screen name={GIFTS} component={Gifts} options={{ unmountOnBlur: true }} />
        <Drawer.Screen name={DRAWER_PRIVACY} component={Privacy} />
        <Drawer.Screen name={DRAWER_TERMS} component={Terms} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
