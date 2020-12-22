import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { LOGIN_SCREEN } from 'navigation/routes';
import { useContext } from 'react';
import { UserDataContext } from 'context';

export default function IsLoggedIn(Component) {

  const HOCIsLoggedIn = () => {
    const [loading, setLoading] = useState(true);
    const { replace, navigate } = useNavigation();
    const { userData } = useContext(UserDataContext);

    useEffect(() => {
      checkUser();
    }, []);

    const checkUser = async () => {
      if (userData?.jwt) {
        setLoading(false);
      }
      else {
        if (replace) {
          replace(LOGIN_SCREEN);
        }
        else {
          navigate(LOGIN_SCREEN);
        }
      }
    }

    return !loading ? <Component /> : null;
  }

  return HOCIsLoggedIn;
}