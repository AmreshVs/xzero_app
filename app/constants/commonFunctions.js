import { Platform, Linking, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SCREEN_WIDTH, THUMBNAIL_SLUG } from './common';
import { ToastMsg } from 'components/toastMsg';

export const getShadowStyle = () => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 9.84,
      elevation: 5,
    }
  }

  return {
    borderWidth: 1,
    borderColor: '#EEE',
  }
}

export const getUserData = async () => {
  let userData = await AsyncStorage.getItem('@xzero_user');
  return JSON.parse(userData);
}

export const getJWT = async () => {
  let jwt = await AsyncStorage.getItem('@xzero_jwt');
  return JSON.parse(jwt);
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateDiffInDays = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export const getFormatedDate = (date) => {
  return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

export const getFormattedDateTime = (date) => {
  return String(date.getDate()).padStart(2, 0) + "-" + String(date.getMonth() + 1).padStart(2, 0) + "-" + date.getFullYear() + " " + String(date.getHours()).padStart(2, 0) + ":" + String(date.getMinutes()).padStart(2, 0) + ":" + String(date.getSeconds()).padStart(2, 0);
}

export const firstLetterUpper = (name) => {
  return name !== undefined ? name.charAt(0).toUpperCase() + name.slice(1) : '';
};

export const dialNumber = (number) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
  else { phoneNumber = `telprompt://${number}`; }
  Linking.openURL(phoneNumber);
};

export const openMaps = (lat, lng, label) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${lng},${lat}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${label}@${latLng}`
  });
  Linking.openURL(url);
}

export const sendWhatsappMessage = (msg, number) => {
  Linking.openURL(`whatsapp://send?text=${msg}&phone=${number}`)
}

export const handleMobileNumber = (mobile_number) => {
  let mobile = String(mobile_number);
  mobile.replace('+', '');

  let extension_pattern = /971/g;
  if (!extension_pattern.test(mobile)) {
    return String('+971' + mobile);
  }

  return String('+' + mobile);
};

export const handleDOB = (dobDate) => {
  let year = dobDate.slice(0, 4);
  let month = dobDate.slice(5, 7);
  let day = Number(dobDate.slice(8, 10));

  return day + '/' + month + "/" + year;
}

export const handleServerDOB = (dobDate) => {
  let day = Number(dobDate.slice(0, 2));
  let month = dobDate.slice(3, 5);
  let year = dobDate.slice(6, 10);

  return year + '-' + month + "-" + day;
}

export const calculatePercentage = (y, x) => {
  let p = y / x;
  return Math.round(p * 100);
}

export const isTab = () => {
  if (SCREEN_WIDTH >= 600) {
    return true;
  }
  return false;
}

export const thumbnailUrl = (url) => {
  return url && url.replace('/uploads/', '/uploads/' + THUMBNAIL_SLUG)
}

export const smallUrl = (url) => {
  return url && url.replace('/uploads/', '/uploads/' + 'small_')
}

export const userVerified = async () => {
  var userData = null;
  let user = await AsyncStorage.getItem('@xzero_user');
  if (user !== null) {
    userData = JSON.parse(user);
  }

  if (userData?.confirmed === false) {
    ToastMsg('Please Verify your account in profile to continue!');
    return false;
  }

  return true;
}

const percentageCalculation = (max, val) => max * (val / 100);

export const responsiveHeight = (h) => {
  const { height } = Dimensions.get("screen");
  return percentageCalculation(height, h);
}

export const responsiveWidth = (w) => {
  const { width } = Dimensions.get("screen");
  return percentageCalculation(width, w);
}