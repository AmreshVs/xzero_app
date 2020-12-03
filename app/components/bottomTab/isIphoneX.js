import { Dimensions, Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export default function isIphoneX() {
  const dim = Dimensions.get('window');
  return (
    // This has to be iOS
    Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
      ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
      : false
  );
};
