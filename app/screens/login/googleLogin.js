import * as GoogleSignIn from 'expo-google-sign-in';

import { GOOGLE_CLIENT_ID } from 'constants/common';
import { LOGIN_SCREEN } from 'navigation/routes';

let input = null;
const googleSignin = async (logError) => {
  try {
    await GoogleSignIn.initAsync({
      clientId: GOOGLE_CLIENT_ID,
      scopes: ["profile", "email"],
      isPromptEnabled: true
    });

    const { type, user, accessToken } = await GoogleSignIn.signInAsync();
    input = { type, user, accessToken };

    if (user) {
      let { displayName, email } = user;
      if (!email) {
        return { error: 'error' };
      }
      if (type === "success") {
        return { username: displayName || '', email, password: accessToken, profile_pic: user?.photoURL };
      }
    }
    return null;
  } catch (error) {
    // console.log('Google Login error', error);
    await logError({
      screen: LOGIN_SCREEN,
      module: 'Google Login',
      input: JSON.stringify(input),
      error: JSON.stringify(error)
    });
    return { error };
  }
}

export default googleSignin;