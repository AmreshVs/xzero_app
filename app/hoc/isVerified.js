import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { PROFILE_TAB_SCREEN } from 'navigation/routes';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import { ToastMsg } from 'components/toastMsg';

export default function IsVerified(Component) {

  const HOCIsVerified = () => {
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation();
    const { userData } = useContext(UserDataContext);

    useEffect(() => {
      checkUser();
    }, []);

    const checkUser = async () => {
      if (userData?.confirmed) {
        setLoading(false);
      }
      else {
        ToastMsg('Please Verify your account to continue!');
        navigate(PROFILE_TAB_SCREEN);
      }
    }

    return !loading ? <Component /> : null;
  }

  return HOCIsVerified;
}