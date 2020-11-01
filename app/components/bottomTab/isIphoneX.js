import { Dimensions } from 'react-native';

export default function isIphoneX() {
  const dim = Dimensions.get('window');
  return (
    // This has to be iOS
    (Platform.OS === 'ios' &&
      // Check either, iPhone X or XR
      (dim.height == 812 || dim.width == 812) || (dim.height == 896 || dim.width == 896))
  );
};
