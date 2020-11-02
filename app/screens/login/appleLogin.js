import React from 'react';
import { View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import { ToastMsg } from 'components/toastMsg';
import RippleFX from 'components/rippleFx';
import styles from './styles';

const AppleLoginButton = ({ handleSocialLogin }) => {

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

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
        ToastMsg('Error Occured, Try again later!');
      }
      // signed in
    } catch (e) {
      // console.log('Apple Login Error', e);
      if (e.code === 'ERR_CANCELED') {
        ToastMsg('You Cancelled Apple Sign In');
      } else {
        ToastMsg('Error Occured, Please Try later!');
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