import React from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';

import { ToastMsg } from 'components/toastMsg';
import RippleFX from 'components/rippleFx';
import { LOGIN_SCREEN } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';

const AppleLoginButton = ({ handleSocialLogin }) => {
  const { t } = useTranslation();
  const { logError } = useErrorLog();
  let input = null;

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      input = credential;
      let email = credential?.email;
      if (email !== null) {
        let username = credential?.fullName?.givenName + ' ' + credential?.fullName?.familyName;
        handleSocialLogin('apple', { username: username, email: email });
      }
      else if (email === null) {
        let decodeJwt = jwtDecode(credential?.identityToken);
        handleSocialLogin('apple', { email: decodeJwt?.email });
      }
      else {
        ToastMsg(t('error_occured'));
      }
    } catch (error) {
      // console.log('Apple Login error', error);
      ToastMsg(t('error_occured'));
      logError({
        screen: LOGIN_SCREEN,
        module: 'Apple Login',
        input: JSON.stringify(input || {}),
        error: JSON.stringify(error)
      });

      if (error.code === 'ERR_CANCELED') {
        ToastMsg(t('apple_cancelled'));
      } else {
        ToastMsg(t('error_occured'));
      }
    }
  }

  return (
    <View style={styles.appleBtnContainer}>
      <RippleFX
        cornerRadius={5}
        style={styles.button}
        onPress={() => handleAppleLogin()}
      >
        <FontAwesomeIcon icon={faApple} color="#FFF" size={25} />
      </RippleFX>
      <RippleFX
        cornerRadius={5}
        style={[styles.button, { backgroundColor: '#3b5998' }]}
        onPress={() => handleSocialLogin('fb')}
      >
        <FontAwesomeIcon icon={faFacebook} color="#FFF" size={25} />
      </RippleFX>
      <RippleFX
        cornerRadius={5}
        style={[styles.button, { backgroundColor: '#db3236' }]}
        onPress={() => handleSocialLogin('g')}
      >
        <FontAwesomeIcon icon={faGoogle} color="#FFF" size={25} />
      </RippleFX>
    </View>
  );
}

export default AppleLoginButton;