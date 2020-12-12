import { StyleSheet, Platform } from 'react-native';

import colors from 'constants/colors';
import { SCREEN_HEIGHT } from 'constants/common';
import { getShadowStyle, isTab } from 'constants/commonFunctions';
import { padding10, positionAbsolute, wh100, marginTop10, w100, justifyContentCenter, alignItemsCenter, fontWeight700, colorWhite, font20, whiteBg, borderRadius10, textBoldDark, font16, textLite, marginLeft5, marginTop5, textDark, overflowHidden, w50, marginRight5, colorDanger, padding0, flex1 } from 'constants/commonStyles';

const mobileStyles = StyleSheet.create({
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
    width: '75%',
    paddingRight: 15
  },
  title: {
    ...textBoldDark,
    ...font16
  },
  location: {
    marginRight: 5,
    ...textLite,
    ...marginLeft5,
  },
  mapContainer: {
    width: '22%',
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

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  mapContainer: {
    ...mobileStyles.mapContainer,
    width: '23.5%'
  },
  infoContainer: {
    ...mobileStyles.infoContainer,
    minHeight: 80
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;