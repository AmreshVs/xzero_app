import { StyleSheet, Platform } from 'react-native';

import colors from 'constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/common';
import { getShadowStyle } from 'constants/commonFunctions';
import { padding10, positionAbsolute, wh100, marginTop10, w100, justifyContentCenter, alignItemsCenter, fontWeight700, colorWhite, font20, whiteBg, borderRadius10, textBoldDark, font16, textLite, marginLeft5, marginTop5, textDark, overflowHidden, w50, marginRight5, colorDanger, padding0, flex1 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...padding10,
  },
  gradient: {
    ...positionAbsolute,
    ...wh100,
  },
  discountContainer: {
    height: SCREEN_HEIGHT / 3,
    ...padding0,
    ...marginTop10,
    ...w100,
    ...justifyContentCenter,
    ...alignItemsCenter,
  },
  discountCircle: {
    height: SCREEN_HEIGHT / 5,
    width: SCREEN_HEIGHT / 5,
    borderRadius: Platform.OS === 'ios' ? 90 : 100,
    ...justifyContentCenter,
    ...alignItemsCenter,
  },
  discount: {
    fontSize: SCREEN_HEIGHT / 15,
    ...fontWeight700,
    ...colorWhite,
  },
  discountText: {
    ...font20,
    ...colorWhite,
    ...fontWeight700,
  },
  caption: {
    bottom: 20,
    ...positionAbsolute,
  },
  card: {
    ...whiteBg,
    ...borderRadius10,
    ...getShadowStyle(),
  },
  infoContainer: {
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT / 10,
  },
  title: {
    ...textBoldDark,
    ...font16
  },
  location: {
    ...textLite,
    ...marginLeft5,
  },
  mapContainer: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_HEIGHT / 10,
    ...justifyContentCenter,
    ...alignItemsCenter,
  },
  mapText: {
    ...marginTop5,
    ...textDark,
  },
  descContainer: {
    ...w100,
    height: 'auto',
  },
  descText: {
    ...textLite,
    ...marginTop5,
  },
  rightIcon: {
    borderRadius: 70,
    ...flex1,
    ...w50,
    ...overflowHidden,
    ...justifyContentCenter,
    ...alignItemsCenter,
  },
  offerBg: {
    opacity: 0.5,
    ...positionAbsolute,
    ...wh100,
  },
  discountPrice: {
    color: colors.gradient2,
    ...marginRight5,
    ...fontWeight700,
    ...font20,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    ...font20,
    ...colorDanger,
  },
});

export default styles;