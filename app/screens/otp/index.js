import React, { useState, useRef, memo, useEffect, useContext } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import Clipboard from 'expo-clipboard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

import { saveUserDataLocally } from 'screens/login/helpers';
import Button from 'components/button';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Box from 'components/box';
import ProgressiveImage from 'components/progressiveImage';
import { ToastMsg } from 'components/toastMsg';
import { thumbnailUrl } from 'constants/commonFunctions';
import { IMAGE_URL } from 'constants/common';
import { UserDataContext } from 'context';
import { SEND_SMS } from 'graphql/mutations';
import { VERIFY_OTP } from 'graphql/queries';
import { HOME_SCREEN } from 'navigation/routes';
import { useInterval } from './helpers';
import styles from './styles';


const Otp = () => {
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [otp, setOtp] = useState('');
  const [responseOtp, setResponseOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const { userData, setUserData } = useContext(UserDataContext);

  const client = useApolloClient();
  const { replace } = useNavigation();
  const { params } = useRoute();
  const { t } = useTranslation();


  let [toggleSmsListener] = useInterval(async () => {
    let clipboardOtp = await Clipboard.getStringAsync();
    if (clipboardOtp === responseOtp) {
      setOtp(responseOtp);
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


  const handleType = (text) => {
    setOtp(text);
  }

  const handleConfirm = async () => {
    setLoading(true);
    const { data, errors } = await client.query({
      query: VERIFY_OTP,
      variables: {
        user: Number(params?.user_id),
        otp: Number(otp)
      },
    });

    if (data?.verifyOtp?.status) {
      setUserData(prevData => ({ ...prevData, confirmed: true }));
      saveUserDataLocally('xzero_user', { ...userData, confirmed: true });
      replace(HOME_SCREEN);
    }

    if (errors) {
      ToastMsg(errors[0]?.extensions?.exception?.data?.data[0]?.messages[0]?.message);
      setBtnDisabled(false);
    }
    setOtp('');
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
      },
    });

    if (data?.SendSms?.status) {
      setResponseOtp(data?.SendSms?.otp);
      toggleSmsListener();
      ToastMsg(t('otp_sent'));
      setBtnDisabled(false);
    }

    return;
  }

  const handleMobileNumber = (mobile_number) => {
    let mobile = String(mobile_number);

    if (!mobile.includes("+")) {
      return String('+' + mobile);
    }

    return mobile;
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <ProgressiveImage
          style={styles.image}
          thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl('/uploads/otp_security_71bddb259b.webp') }}
          source={{ uri: IMAGE_URL + '/uploads/otp_security_71bddb259b.webp' }}
        />
        <Text style={styles.caption}>{t('otp_desc')}</Text>
        <Text style={styles.mobile}>{handleMobileNumber(params?.mobile_number)}</Text>
        <Row style={styles.inputsContainer}>
          <Textbox
            placeholder="XXXX"
            value={otp}
            style={styles.textbox}
            keyboardType='numeric'
            onChangeText={(text) => handleType(text)}
            maxLength={4}
          />
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
            disabled={btnDisabled}
          >
            {t('confirm')}
          </Button>
        </Row>
      </View>
    </KeyboardAvoidingView>
  )
}

export default memo(Otp);