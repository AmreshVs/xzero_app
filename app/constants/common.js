import { Dimensions } from "react-native";

export const phoneRegExp = /^(?:\+)((?:3|4|5|6|7|9|50|51|52|55|56)[0-9]{7,})$/;
export const BASE_URL = 'http://192.168.43.49:1337'
// export const BASE_URL = 'https://be.xzero.app';
export const API_URL = `${BASE_URL}/`;
export const IMAGE_URL = `${BASE_URL}`;

export const SOCIAL_TOKEN = 'a308430d2bfd491027ec990136bdb42a';

// Payment URL's
// Ngenius Sandbox
// export const PAYMENT_OUTLET_ID = 'c78c96d1-2877-46f5-b17c-7558d7369998';
// export const PAYMENT_DOMAIN = 'https://api-gateway.sandbox.ngenius-payments.com';
// export const PAYMENT_API_KEY = 'YTJlMjQyOTItNjMyOC00Y2Y5LWFjYzUtMWFhNGY4ZWQ5Nzg5OjEyYzBiMTExLTM2ZmMtNDdmNi1iZWY2LWQ5NjlhOWVjOTM5Mg==';

// Ngenius Live
export const PAYMENT_OUTLET_ID = 'fa398596-5e9b-40a8-ab6e-e897aefccf17';
export const PAYMENT_DOMAIN = 'https://api-gateway.ngenius-payments.com';
export const PAYMENT_API_KEY = 'N2JjNGUwZjEtYjI5My00MTgxLWEyZWUtOTRmNDQzYjI5NjEyOmQ5NzI4ODZhLTY0YzYtNDBlZS04NWY5LTdiZWFhOGY5OTU0Mw==';

export const GENERATE_ACCESS_TOKEN_URL = `${PAYMENT_DOMAIN}/identity/auth/access-token`;
export const CREATE_PAYMENT_URL = `${PAYMENT_DOMAIN}/transactions/outlets/${PAYMENT_OUTLET_ID}/orders`;
export const CHECK_PAYMENT_STATUS_URL = `${PAYMENT_DOMAIN}/transactions/outlets/${PAYMENT_OUTLET_ID}/orders`;

// Screen
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;

// Image Thumbnail
export const THUMBNAIL_SLUG = 'thumbnail_';