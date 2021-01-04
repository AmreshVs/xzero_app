import React, { useContext, useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import RippleFX from 'components/rippleFx';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import { ToastMsg } from 'components/toastMsg';
import Loader from 'components/loader';
import { getAuthenticationHeader, getUserData } from 'constants/commonFunctions';
import colors from 'constants/colors';
import { UserDataContext } from 'context';
import { PAYMENT, PAYMENT_STATUS } from 'navigation/routes';
import { BUY_VOUCHER, GENERATE_MEMBESHIP } from 'graphql/mutations';
import { GENERATE_PAYMENT_ACCESS_TOKEN, GENERATE_PAYMENT_URL, CHECK_PAYMENT_STATUS } from 'api';
import { useAxios } from 'hooks';
import useErrorLog from 'hooks/useErrorLog';
import usePaymentLog from 'hooks/usePaymentLog';
import styles from './styles';

var captured = false;
var failed = false;
export default function Payment() {
  const initialState = {
    loading: true,
    reloading: false,
    url: '',
    access_token: '',
  };
  const [state, setState] = useState(initialState);
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const { logPayment } = usePaymentLog();
  const { replace } = useNavigation();
  const { params } = useRoute();
  const { t } = useTranslation();
  const client = useApolloClient();

  useEffect(() => {
    if (params?.discount === "100") {
      postPayment('SUCCESS');
    }
    else {
      GeneratePaymentUrl();
    }

    return () => {
      setState(initialState);
      captured = false;
      failed = false;
    };
  }, []);

  const GeneratePaymentUrl = async () => {
    let access_token = null;
    let payment_url_response = null;
    try {
      let { email, username } = await getUserData();
      const GENERATE_PAYMENT_BODY = {
        action: 'SALE',
        emailAddress: email,
        billingAddress: {
          firstName: username,
        },
        amount: {
          currencyCode: 'AED',
          value: params?.amount * 100,
        },
        merchantAttributes: {
          skipConfirmationPage: true,
        },
      };

      // Get Access Token
      const token_response = await useAxios(GENERATE_PAYMENT_ACCESS_TOKEN);
      access_token = token_response?.access_token;

      // Logging Response
      logPayment({
        for: params?.voucher_id ? 'VOUCHER' : 'MEMBERSHIP',
        module: 'Generate Payment Url',
        url: GENERATE_PAYMENT_ACCESS_TOKEN?.url,
        input: '',
        response: JSON.stringify(token_response),
        status: 'PAYMENT_TOKEN_GENERATED',
        voucher: Number(params?.voucher_id || 0),
        membership_plan: Number(params?.plan || 0)
      });

      payment_url_response = await useAxios(
        {
          ...GENERATE_PAYMENT_URL,
          headers: {
            ...GENERATE_PAYMENT_URL.headers,
            Authorization: `Bearer ${access_token}`,
          },
        },
        GENERATE_PAYMENT_BODY
      );

      // Logging Response
      logPayment({
        for: params?.voucher_id ? 'VOUCHER' : 'MEMBERSHIP',
        module: 'Payment Url response',
        url: GENERATE_PAYMENT_URL?.url,
        input: JSON.stringify({
          ...GENERATE_PAYMENT_URL.headers,
          Authorization: `Bearer ${access_token}`,
        }),
        response: JSON.stringify(payment_url_response),
        status: 'PAYMENT_INITIATED',
        voucher: Number(params?.voucher_id || 0),
        membership_plan: Number(params?.plan || 0)
      });

      setState({
        ...state,
        loading: false,
        url: payment_url_response?._links?.payment?.href + '&slim=true',
        access_token: access_token,
      });
    }
    catch (error) {
      console.log('Generate payment url error', error);
      setState({
        ...state,
        loading: false,
      });
      ToastMsg(t('error_occured'));
      logError({
        screen: PAYMENT,
        module: 'Generate payment url',
        input: JSON.stringify({
          access_token,
          payment_url_response
        }),
        error: JSON.stringify(error)
      });
    }
  };

  const handleMessage = async (e) => {
    let response = JSON.parse(e?.nativeEvent?.data || '{}')?.order;
    let paymentState = response?.state;
    let orderReference = response?.reference;

    if (paymentState) {
      // Logging Response
      logPayment({
        for: params?.voucher_id ? 'VOUCHER' : 'MEMBERSHIP',
        module: 'Bank Payment Process',
        url: '',
        input: '',
        response: JSON.stringify(response),
        status: 'BANK_PROCESS',
        voucher: Number(params?.voucher_id || 0),
        membership_plan: Number(params?.plan || 0)
      });
    }

    if (paymentState === 'POST_AUTH_REFER') {
      checkPaymentStatus(orderReference);
    }

    if (paymentState === 'CAPTURED') {
      if (!captured) {
        captured = true;
        await postPayment(paymentState);
      }
      return;
    }

    if (paymentState === 'FAILED') {
      if (!failed) {
        failed = true;
        await replace(PAYMENT_STATUS, { status: false });
        return;
      }
    }
  };

  const checkPaymentStatus = async (orderReference) => {
    setState({ ...state, reloading: true });
    const paymentStatusResponse = await useAxios({
      ...CHECK_PAYMENT_STATUS,
      url: `${CHECK_PAYMENT_STATUS.url}/${orderReference}`,
      headers: {
        Authorization: `Bearer ${state.access_token}`,
      },
    });
    setState({ ...state, reloading: false });
    let status = paymentStatusResponse['_embedded']?.payment[0]['3ds']?.status;
    await postPayment(status);
  };

  const postPayment = async (status) => {
    // Logging Response
    logPayment({
      for: params?.voucher_id ? 'VOUCHER' : 'MEMBERSHIP',
      module: `Post Payment ${params?.discount === "100" ? 'Free' : ''}`,
      url: '',
      input: '',
      response: '',
      status: status,
      voucher: Number(params?.voucher_id || 0),
      membership_plan: Number(params?.plan || 0)
    });

    if (status === 'SUCCESS' || status === 'CAPTURED') {
      setState({ ...state, reloading: true });

      if (params?.voucher_id) {
        await client.mutate({
          mutation: BUY_VOUCHER,
          variables: {
            user_id: Number(userData?.id),
            voucher_id: Number(params?.voucher_id),
            code: params?.promocode || null
          },
          ...getAuthenticationHeader(userData?.jwt)
        });
      }
      else {
        await client.mutate({
          mutation: GENERATE_MEMBESHIP,
          variables: {
            user_id: Number(userData?.id),
            plan: Number(params?.plan),
            code: params?.promocode || null
          },
          ...getAuthenticationHeader(userData?.jwt)
        });

      }
      setState({ ...state, reloading: false });
      replace(PAYMENT_STATUS, { status: true });
      return;
    } else {
      replace(PAYMENT_STATUS, { status: false });
      return;
    }
  };

  const jsCode = `
    XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(value) {
      this.addEventListener("progress", function(e){
        window.ReactNativeWebView.postMessage(this.responseText);
      }, false);
      this.realSend(value);
    };
  `;

  const RightIcon = () => {
    return (
      <RippleFX style={styles.rightIcon} onPress={() => GeneratePaymentUrl()}>
        <FontAwesomeIcon icon="redo-alt" color={colors.white} size={15} />
      </RippleFX>
    );
  };

  return (
    <SafeView style={styles.container} loading={state.loading}>
      <TopNavigator
        title={`${t('pay')} - ${params?.amount} ${t('aed')}`}
        rightContainer={<RightIcon />}
        gradient
      />
      {state.reloading && <Loader />}
      <WebView
        domStorageEnabled={true}
        javaScriptEnabled={true}
        injectedJavaScript={jsCode}
        onMessage={handleMessage}
        source={{
          uri: state.url,
        }}
        onLoadStart={() => setState({ ...state, reloading: true })}
        onLoadEnd={() => setTimeout(() => setState({ ...state, reloading: false }), 3000)}
      />
    </SafeView>
  );
}