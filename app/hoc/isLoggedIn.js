import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { getJWT } from 'constants/commonFunctions';
import { LOGIN_SCREEN } from 'navigation/routes';

export default function IsLoggedIn(Component) {

  const HOCIsLoggedIn = () => {
    const [loading, setLoading] = useState(true);
    const { replace } = useNavigation();

    useEffect(() => {
      checkUser();
    }, []);

    const checkUser = async () => {
      let jwt = await getJWT();
      if (jwt) {
        setLoading(false);
      }
      else {
        replace(LOGIN_SCREEN);
      }
    }

    return !loading ? <Component /> : null;
  }

  return HOCIsLoggedIn;
}