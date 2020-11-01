import { useEffect, useState } from "react";

import { useAxios } from 'hooks';
import { ToastMsg } from 'components/toastMsg';

export default function useApi(api, data) {

  const [state, setState] = useState({
    loading: true,
    response: [],
    reloading: false
  });

  useEffect(() => {
    loadAPI();
  }, []);

  const loadAPI = async (reload) => {
    if (reload) {
      setState({ ...state, reloading: true });
    }
    const response = await useAxios(api, data);
    setState({ ...state, loading: false, response: response, reloading: reload ? false : state.reloading });
    if (response.status === 422) {
      if (response?.message) {
        ToastMsg(response.message);
      }
      return;
    }
  };

  const reload = () => {
    loadAPI(true);
  }

  return {
    loading: state.loading,
    response: state.response,
    reloading: state.reloading,
    reload
  }
}