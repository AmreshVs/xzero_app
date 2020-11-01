import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function useUserData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let userDataString = await AsyncStorage.getItem('@xzero_user');
      if (userDataString !== null && userDataString !== '') {
        let userData = JSON.parse(userDataString);
        setUserData(userData);
      }
      return;
    }
    catch (e) {
      // console.log('getUserData', e);
    }
  }

  return userData;
}