import { StyleSheet, Dimensions } from 'react-native';

import { getShadowStyle } from 'constants/commonFunctions';
import { SCREEN_WIDTH } from 'constants/common';
import colors from 'constants/colors';
import { flex, flexSpaceBetween, flexRow, borderRadius10, w100, textBoldDark, textLite, whiteBg, alignJustifyCenter, font16, positionAbsolute, colorWhite, font15, fontWeight700, marginBottom10, marginBottom5, marginTop5, borderRadius30, overflowHidden, marginLeft10, marginBottom0, colorDanger, font20, w50, h50, h200, padding15, textAlignLeft, resizeModeCover, flex1, h100px, w100px, paddingBottom5, colorPrimary } from 'constants/commonStyles';

const styles = StyleSheet.create({
  topContainer: {
    top: -65,
    marginBottom: -65,
  },
  container: {
    ...flex,
    ...flexSpaceBetween,
    ...flexRow,
    flexWrap: 'wrap',
  },
  categoryContainer: {
    width: '48.5%',
    ...whiteBg,
    ...borderRadius10,
    ...marginBottom10,
    ...getShadowStyle(),
  },
  image: {
    height: SCREEN_WIDTH / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...w100,
    ...resizeModeCover,
  },
  heading: {
    ...textBoldDark,
    ...marginBottom5,
  },
  caption: {
    ...textLite,
  },
  centerContainer: {
    ...flex1,
    ...marginBottom10,
    ...whiteBg,
    ...w100,
    ...borderRadius10,
    ...getShadowStyle(),
  },
  centerImage: {
    ...h100px,
    ...w100px,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 2,
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 3,
  },
  title: {
    ...textAlignLeft,
    ...marginBottom5,
    ...textBoldDark,
    ...w100,
  },
  caption: {
    ...textLite,
  },
  chipContainer: {
    ...marginTop5,
    ...w100,
  },
  iconContainer: {
    ...w50,
    ...h50,
    ...overflowHidden,
    ...borderRadius30,
    ...alignJustifyCenter
  },
  membership: {
    marginTop: -50,
    ...paddingBottom5,
  },
  membershipContainer: {
    ...padding15,
    ...whiteBg,
    ...borderRadius10,
    ...getShadowStyle(),
  },
  secondaryText: {
    ...textLite,
  },
  title: {
    ...textBoldDark,
  },
  icon1: {
    backgroundColor: '#f0cfff',
  },
  icon2: {
    backgroundColor: colors.primary_lite,
  },
  icon3: {
    backgroundColor: '#ffb8c6',
  },
  count: {
    ...marginTop5,
    ...font16,
    ...textBoldDark,
  },
  buy: {
    ...colorDanger,
  },
  sliderImage: {
    width: Dimensions.get('window').width - 20,
    ...h200,
    ...marginBottom0,
    ...marginLeft10,
    ...marginTop5,
    ...borderRadius10,
  },
  indicator: {
    backgroundColor: colors.primary,
  },
  slider: {
    ...overflowHidden,
  },
  gradient: {
    ...h200,
  },
  topSectionContainer: {
    ...positionAbsolute,
    ...w100,
  },
  navContainer: {
    ...flexRow,
    ...flexSpaceBetween,
  },
  iconContainer: {
    ...w50,
    ...h50,
    ...borderRadius30,
    ...overflowHidden,
    ...alignJustifyCenter,
  },
  username: {
    ...font20,
    ...colorWhite,
    ...fontWeight700
  },
  textContiner: {
    ...marginLeft10,
  },
  topCaption: {
    color: colors.lite_gray,
  },
  language: {
    marginHorizontal: 5,
    ...fontWeight700,
    ...font15,
    ...colorWhite,
  },
});

export default styles;