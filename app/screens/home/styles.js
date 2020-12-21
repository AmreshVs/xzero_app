import { StyleSheet } from 'react-native';

import { getShadowStyle, isTab } from 'constants/commonFunctions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/common';
import colors from 'constants/colors';
import { flex, flexSpaceBetween, flexRow, borderRadius10, w100, textBoldDark, textLite, whiteBg, alignJustifyCenter, font16, positionAbsolute, colorWhite, font15, fontWeight700, marginBottom10, marginBottom5, marginTop5, borderRadius30, overflowHidden, marginLeft10, marginBottom0, colorDanger, font20, w50, h50, h200, padding15, textAlignLeft, resizeModeCover, flex1, h100px, w100px, paddingBottom5, colorPrimary } from 'constants/commonStyles';

const mobileStyles = StyleSheet.create({
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
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 3,
  },
  chipContainer: {
    ...marginTop5,
    ...w100,
  },
  membership: {
    marginTop: -65,
    ...paddingBottom5,
  },
  membershipContainer: {
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
  icon4: {
    backgroundColor: '#ffe8d4',
  },
  icon5: {
    backgroundColor: '#bcf5f5',
  },
  icon5Color: {
    color: '#32d6c6'
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
    width: SCREEN_WIDTH - 20,
    borderRadius: 5,
    ...h200,
    ...marginBottom0,
    ...marginLeft10,
    ...marginTop5,
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
  countContainer: {
    minWidth: SCREEN_WIDTH / 3.7,
  },
  modal: {
    backgroundColor: colors.lite_gray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heading: {
    fontWeight: '700',
    color: colors.text_dark,
    fontSize: 17,
    marginBottom: 5
  },
  searchResultHeading: {
    color: colors.chip_1,
    fontWeight: '700',
  },
  resultText: {
    color: colors.text_dark,
  },
  profile_pic: {
    width: 50,
    height: 50,
  },
  imgContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 10,
    overflow: 'hidden'
  }
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  countContainer: {
    minWidth: SCREEN_WIDTH / 5,
  },
  sliderImage: {
    ...mobileStyles.sliderImage,
    height: 400
  },
  categoryContainer: {
    ...mobileStyles.categoryContainer,
    width: '24%',
  },
  image: {
    ...mobileStyles.image,
    height: SCREEN_HEIGHT / 7
  },
  centerContainer: {
    ...mobileStyles.centerContainer,
    width: SCREEN_WIDTH / 2.08,
  },
  topCenters: {
    ...flex,
    ...flexSpaceBetween,
    ...flexRow,
    flexWrap: 'wrap',
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;