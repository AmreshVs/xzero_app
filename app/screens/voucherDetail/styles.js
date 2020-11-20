import { StyleSheet } from 'react-native';

import { font16, padding15, paddingBottom10, positionAbsolute, textBoldDark, textLite, w100, wh100, zIndex1 } from 'constants/commonStyles';
import { SCREEN_HEIGHT } from 'constants/common';
import { getShadowStyle } from 'constants/commonFunctions';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'relative'
  },
  imgContainer: {
    height: SCREEN_HEIGHT / 4,
    ...getShadowStyle(),
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover'
  },
  title: {
    ...textBoldDark,
    ...font16
  },
  caption: {
    ...textLite
  },
  productImg: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    resizeMode: 'contain',
    marginBottom: 5
  },
  buyNowButton: {
    bottom: 60,
    padding: 10
  }
});

export default styles;