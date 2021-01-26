import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { PROFILE_TAB_SCREEN } from 'navigation/routes';
import { ToastMsg } from 'components/toastMsg';
import { useReduxAction } from 'constants/commonFunctions';

export default function IsVerified(Component) {

  const HOCIsVerified = () => {
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation();
    const userData = useReduxAction(state => state?.userReducer?.user);

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