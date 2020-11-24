import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import RippleFX from 'components/rippleFx';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import { GENERATE_PAYMENT_ACCESS_TOKEN, GENERATE_PAYMENT_URL, CHECK_PAYMENT_STATUS } from 'api';
import { useAxios } from 'hooks';
import colors from 'constants/colors';
import { PAYMENT_STATUS } from 'navigation/routes';
import { getUserData, getJWT } from 'constants/commonFunctions';
import { BUY_VOUCHER, GENERATE_MEMBESHIP } from 'graphql/mutations';
import Loader from 'components/loader';
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
  const { replace } = useNavigation();
  const { params } = useRoute();
  const [state, setState] = useState(initialState);
  const client = useApolloClient();

  useEffect(() => {
    GeneratePaymentUrl();
    return () => {
      setState(initialState);
      captured = false;
      failed = false;
    };
  }, []);

  const GeneratePaymentUrl = async () => {
    let { email, username } = await getUserData();
    const GENERATE_PAYMENT_BODY = {
      action: 'SALE',
      emailAddress: email,
      billingAddress: {
        firstName: username,
      },
      amount: {
        currencyCode: params?.currency_code,
        value: params?.amount * params?.multiplier,
      },
      merchantAttributes: {
        skipConfirmationPage: true,
      },
    };

    // Get Access Token
    const token_response = await useAxios(GENERATE_PAYMENT_ACCESS_TOKEN);
    const access_token = token_response?.access_token;

    const payment_url_response = await useAxios(
      {
        ...GENERATE_PAYMENT_URL,
        headers: {
          ...GENERATE_PAYMENT_URL.headers,
          Authorization: `Bearer ${access_token}`,
        },
      },
      GENERATE_PAYMENT_BODY
    );
    setState({
      ...state,
      loading: false,
      url: payment_url_response?._links?.payment?.href + '&slim=true',
      access_token: access_token,
    });
  };

  const handleMessage = async (e) => {
    let response = JSON.parse(e?.nativeEvent?.data || '{}')?.order;
    let paymentState = response?.state;
    let orderReference = response?.reference;

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
    if (status === 'SUCCESS' || status === 'CAPTURED') {
      setState({ ...state, reloading: true });
      let { id } = await getUserData();
      let jwt = await getJWT();

      if (params?.voucher_id) {
        await client.mutate({
          mutation: BUY_VOUCHER,
          variables: {
            user_id: id,
            voucher_id: Number(params?.voucher_id),
          },
          context: {
            headers: {
              authorization: 'Bearer ' + jwt,
            },
          },
        });
      }
      else {
        await client.mutate({
          mutation: GENERATE_MEMBESHIP,
          variables: {
            user_id: id,
            amount: Number(params?.amount),
          },
          context: {
            headers: {
              authorization: 'Bearer ' + jwt,
            },
          },
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
        title={`Pay - ${params?.amount} ${params?.currency_code}`}
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