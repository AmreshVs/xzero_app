import { StyleSheet } from 'react-native';

import { getShadowStyle, isTab } from 'constants/commonFunctions';
import { padding10, borderRadius10, borderRadius20, marginBottom5, w100, h100, overflowHidden, whiteBg, textLite, textBoldDark, paddingBottom10, marginBottom0, resizeModeContain } from 'constants/commonStyles';
import colors from 'constants/colors';

const mobileStyles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 10,
    ...paddingBottom10,
  },
  offerContainer: {
    paddingVertical: 10,
    marginTop: 10,
    paddingBottom: 0,
    ...w100,
    ...whiteBg,
    ...borderRadius10,
    ...padding10,
    ...getShadowStyle(),
    ...marginBottom0,
  },
  title: {
    ...textBoldDark,
    ...marginBottom5,
  },
  image: {
    ...w100,
    ...h100,
    ...resizeModeContain
  },
  imgContainer: {
    width: 80,
    height: 80,
    ...borderRadius10,
    ...overflowHidden,
  },
  nameContainer: {
    ...h100,
    marginLeft: 5,
  },
  iconContainer: {
    marginTop: -10,
    marginRight: -10,
    ...padding10,
    ...borderRadius20,
    ...overflowHidden,
  },
  caption: {
    ...textLite,
    ...marginBottom5,
  },
  strike: {
    color: colors.danger,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: '500'
  }
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  offerContainer: {
    ...mobileStyles.offerContainer,
    width: '49.2%',
    marginRight: 10
  },
  flatlist: {
    ...mobileStyles.flatlist,
    justifyContent: 'flex-start',
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;