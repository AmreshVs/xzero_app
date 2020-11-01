import * as Facebook from 'expo-facebook';

const facebookLogin = async () => {
  try {
    await Facebook.initializeAsync({ appId: '366021757877568', appName: 'Xzero App' });
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email', 'public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      return await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about`
      )
        .then((response) => {
          return response.json();
        })
        .then((facebookData) => {
          let name = facebookData.name.split(' ');
          let fname = name[0];
          let lname = name[1] || '';
          let email = facebookData.email;

          return { username: fname + ' ' + lname, email, password: token };
        })
      // .catch((err) => console.log(err));
    } else {
      return null;
    }
  } catch (error) {
    // console.log('Facebook Login Error', error);
    return 'error';
  }
}

export default facebookLogin;