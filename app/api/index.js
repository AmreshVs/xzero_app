import { GENERATE_ACCESS_TOKEN_URL, PAYMENT_API_KEY, CREATE_PAYMENT_URL, CHECK_PAYMENT_STATUS_URL, BASE_URL } from "constants/common";

const POST = 'POST';
const GET = 'GET';

export const LOGIN = {
  url: `${BASE_URL}:1337/auth/local`,
  method: POST,
};

export const SIGNUP = {
  url: 'users/signup',
  method: POST,
};

export const GENERATE_PAYMENT_ACCESS_TOKEN = {
  url: GENERATE_ACCESS_TOKEN_URL,
  method: POST,
  headers: {
    'Accept': 'application/vnd.ni-identity.v1+json',
    'Content-Type': 'application/vnd.ni-identity.v1+json',
    'Authorization': `Basic ${PAYMENT_API_KEY}`
  }
}

export const GENERATE_PAYMENT_URL = {
  url: CREATE_PAYMENT_URL,
  method: POST,
  headers: {
    'Accept': 'application/vnd.ni-payment.v2+json',
    'Content-Type': 'application/vnd.ni-payment.v2+json',
  }
}

export const CHECK_PAYMENT_STATUS = {
  url: CHECK_PAYMENT_STATUS_URL,
  method: GET,
}

export const LOG = {
  url: `${BASE_URL}/log`,
  method: POST,
}