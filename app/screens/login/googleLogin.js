import * as GoogleSignIn from 'expo-google-sign-in';

const googleSignin = async () => {
  try {
    await GoogleSignIn.initAsync({
      androidClientId: "471013991175-qke7j7trsnv3hg9oju2d4fbdja65rk8j.apps.googleusercontent.com",
      webClientId: "471013991175-iv356mr943l214f2vsupmfa60sigu7rg.apps.googleusercontent.com",
      clientId: "471013991175-4rroh153tfrmh484j6tu7dgbupq3tnpq.apps.googleusercontent.com",
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