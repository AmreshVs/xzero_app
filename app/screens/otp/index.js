import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import Clipboard from 'expo-clipboard';

import Button from 'components/button';
import Row from 'components/row';
import Textbox from 'components/textbox';
import styles from './styles';
import Box from 'components/box';
import { useApolloClient } from '@apollo/client';
import { SEND_SMS } from 'graphql/mutations';
import { ToastMsg } from 'components/toastMsg';
import { VERIFY_OTP } from 'graphql/queries';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HOME_SCREEN } from 'navigation/routes';
import { useInterval } from './helpers';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import { saveUserDataLocally } from 'screens/login/helpers';
import { memo } from 'react';
import { IMAGE_URL } from 'constants/common';
import ProgressiveImage from 'components/progressiveImage';

let otpArray = [];

const Otp = () => {
  const initialState = [
    { value: '', ref: useRef() },
    { value: '', ref: useRef() },
    { value: '', ref: useRef() },
    { value: '', ref: useRef() }
  ];

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(initialState);
  const [responseOtp, setResponseOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const { userData, setUserData } = useContext(UserDataContext);

  const client = useApolloClient();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { t } = useTranslation();

  let [toggleSmsListener] = useInterval(async () => {
    let clipboardOtp = await Clipboard.getStringAsync();

    if (clipboardOtp === responseOtp) {
      setOtp([
        { ...otp[0], value: responseOtp[0] },
        { ...otp[1], value: responseOtp[1] },
        { ...otp[2], value: responseOtp[2] },
        { ...otp[3], value: responseOtp[3] },
      ]);
      toggleSmsListener();
    }

  }, 2000);

  const [toggleTimer, runningStatus] = useInterval(() => {
    if (timer < 100) {
      setTimer(count => count + 1);
      return;
    }

    toggleTimer();
  }, 600);

  useEffect(() => {
    handleResend();
    toggleTimer();
    toggleSmsListener();
  }, []);


  const handleType = (text, index) => {
    otpArray = otp;
    otpArray[index] = { ...otpArray[index], value: text };
    setOtp([...otpArray]);

    if (text === '') {
      if (otp[index - 1] !== undefined) {
        otp[index - 1].ref?.current.focus();
        return;
      }

      otp[0].ref?.current.focus();
      return;
    }

    if (otp[index].ref?.current && otp[index + 1]) {
      otp[index + 1].ref?.current.focus();
    }
  }

  const handleConfirm = async () => {
    setOtp([...initialState]);
    setLoading(true);
    const { data, errors } = await client.query({
      query: VERIFY_OTP,
      variables: {
        user: Number(params?.user_id),
        otp: Number(otp[0].value + otp[1].value + otp[2].value + otp[3].value)
      },
    });

    if (data?.verifyOtp?.status) {
      setUserData(prevData => ({ ...prevData, confirmed: true }));
      saveUserDataLocally('xzero_user', { ...userData, confirmed: true });
      navigate(HOME_SCREEN);
    }

    if (errors) {
      ToastMsg(errors[0]?.extensions?.exception?.data?.data[0]?.messages[0]?.message);
    }
    setLoading(false);
  }

  const handleResend = async () => {
    setTimer(0);
    toggleTimer();

    const { data } = await client.mutate({
      mutation: SEND_SMS,
      variables: {
        user: Number(params?.user_id),
        mobile: String(params?.mobile_number),
      }
    });

    if (data?.SendSms) {
      setResponseOtp(data?.SendSms?.otp);
      toggleSmsListener();
      ToastMsg(t('otp_sent'));
    }

    return;
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <ProgressiveImage
          style={styles.image}
          source={{ uri: IMAGE_URL + '/uploads/otp_security_71bddb259b.webp' }}
        />
        <Text style={styles.caption}>{t('otp_desc')}</Text>
        <Row style={styles.inputsContainer}>
          {otp.map((item, index) => {
            return (
              <Textbox
                ref={item.ref}
                placeholder=""
                value={otp[index].value}
                style={styles.textbox}
                onChangeText={(text) => handleType(text, index)}
                key={index}
              />
            )
          }
          )}
        </Row>
        {runningStatus ?
          <Box marginTop={20}>
            <Text style={styles.caption}>{t('resend_otp')} {timer}</Text>
          </Box>
          :
          <Row marginTop={20}>
            <Button
              status="chip_1"
              size="small"
              width="30%"
              onPress={() => handleResend()}
            >
              {t('resendotp')}
            </Button>
          </Row>
        }
        <Row marginTop={20}>
          <Button
            width="60%"
            icon="check"
            status={'primary'}
            onPress={() => handleConfirm()}
            loading={loading}
            disabled={otp[0].value === '' && otp[1].value === '' && otp[2].value === '' && otp[3].value === ''}
          >
            {t('confirm')}
          </Button>
        </Row>
      </View>
    </KeyboardAvoidingView>
  )
}

export default memo(Otp);