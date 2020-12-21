import axios from 'axios';
import { API_URL } from 'constants/common';

const UseAxios = async (params, data, apiUrl = API_URL) => {
  let { url, method, headers } = params;

  return await axios({
    url: url.includes("http") ? url : apiUrl + url,
    method: method,
    headers: headers || {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data || null,
  })
    .then((response) => {
      return { status: 200, ...response?.data };
    })
    .catch((error) => {
      console.log('Axios error', error);
      return { status: 422, ...error?.response?.data };
    })
}

export default UseAxios;