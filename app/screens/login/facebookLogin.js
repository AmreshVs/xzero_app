import * as Facebook from 'expo-facebook';

import { FB_APP_ID, APP_NAME } from 'constants/common';
import { LOGIN_SCREEN } from 'navigation/routes';

const facebookLogin = async (logError) => {
  let input = null;

  try {
    await Facebook.initializeAsync({ appId: FB_APP_ID, appName: APP_NAME });
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email', 'public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      return await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture.type(large)`
      )
        .then((response) => {
          return response.json();
        })
        .then((facebookData) => {
          input = facebookData;
          let name = facebookData.name.split(' ');
          let fname = name[0];
          let lname = name[1] || '';
          let email = facebookData.email;

          return { username: fname + ' ' + lname, email, password: token, profile_pic: facebookData?.picture?.data?.url };
        })
    } else {
      return null;
    }
  } catch (error) {
    // console.log('Facebook login error', error);
    logError({
      screen: LOGIN_SCREEN,
      module: 'Facebook Login',
      input: JSON.stringify(input),
      error: JSON.stringify(error)
    });
    return { error };
  }
}

export default facebookLogin;