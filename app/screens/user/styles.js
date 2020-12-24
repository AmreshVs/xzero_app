import { StyleSheet } from 'react-native';

import { getShadowStyle, isTab } from 'constants/commonFunctions';
import { whiteBg, h100, w100, positionAbsolute, borderRadius10, borderRadius50, justifyContentCenter, alignItemsCenter, font18, fontWeight700, colorWhite, padding10, overflowHidden, marginTop20, font16, textDark, colorDanger, textAlignLeft, textLite, font20, marginTop10, marginTop5, textAlignCenter, padding20, paddingVertical18, marginTop30, colorGray, padding0 } from 'constants/commonStyles';

const mobileStyles = StyleSheet.create({
  container: {
    ...whiteBg,
  },
  safeView: {
    ...h100,
    ...whiteBg,
  },
  gradient: {
    height: '100%',
    ...w100,
    ...positionAbsolute,
  },
  accContainer: {
    width: 120,
    height: 120,
    top: 25,
    marginBottom: 50,
    ...whiteBg,
    ...borderRadius10,
    ...justifyContentCenter,
    ...alignItemsCenter,
    ...getShadowStyle(),
  },
  name: {
    top: 10,
    ...textAlignCenter,
    ...w100,
    ...font18,
    ...fontWeight700,
    ...colorWhite,
    ...positionAbsolute,
  },
  iconContainer: {
    top: 5,
    right: 10,
    zIndex: 9,
    ...positionAbsolute,
    ...padding10,
    ...borderRadius50,
    ...overflowHidden,
  },
  inputsContainer: {
    paddingTop: 0,
    ...w100,
    ...padding10,
  },
  btnContainer: {
    ...marginTop20,
  },
  text: {
    paddingVertical: 15,
    ...font16,
    ...textDark,
  },
  logout: {
    ...paddingVertical18,
    ...font16,
    ...colorDanger,
    ...textAlignLeft,
  },
  caption: {
    ...paddingVertical18,
    ...font16,
    ...textLite,
    ...textAlignLeft,
  },
  userCardContainer: {
    ...padding0,
    ...w100,
    ...justifyContentCenter,
    ...alignItemsCenter,
  },
  topContaier: {
    height: 220
  },
  userIconContainer: {
    ...padding10,
    ...borderRadius50,
    ...whiteBg,
    overflow: 'hidden'
  },
  username: {
    ...colorWhite,
    ...font20,
    ...fontWeight700,
    ...marginTop10,
  },
  userCardCaption: {
    ...colorGray,
    ...marginTop5,
  },
  profile_pic: {
    width: 60,
    height: 60,
  },
  tickIcon: {
    position: 'absolute',
  },
  verifyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  }
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  profileView: {
    width: '60%',
  },
  profileViewContainer: {
    alignItems: 'center',
  },
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;