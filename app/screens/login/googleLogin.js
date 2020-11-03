import * as GoogleSignIn from 'expo-google-sign-in';

import { GOOGLE_CLIENT_ID } from 'constants/common';

const googleSignin = async () => {
  try {
    await GoogleSignIn.initAsync({
      clientId: GOOGLE_CLIENT_ID,
      scopes: ["profile", "email"],
    });
    const { type, user, accessToken } = await GoogleSignIn.signInAsync();
    if (user) {
      let { displayName, email } = user;
      if (!email) {
        return 'error';
      }
      if (type === "success") {
        return { username: displayName || '', email, password: accessToken };
      }
    }
    return null;
  } catch (error) {
    // console.log('Google Login error', error);
    return 'error';
  }
}

export default googleSignin;