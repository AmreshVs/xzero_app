import { StyleSheet } from 'react-native';

import { getShadowStyle, isTab } from 'constants/commonFunctions';
import { padding10, borderRadius10, borderRadius20, marginBottom5, w100, h100, overflowHidden, whiteBg, marginBottom10, textLite, textBoldDark, h100px, paddingBottom10, marginBottom0, w100px, resizeModeContain, resizeModeCover } from 'constants/commonStyles';

const mobileStyles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 10,
    ...paddingBottom10,
  },
  offerContainer: {
    paddingVertical: 10,
    marginTop: 10,
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
  chip: {
    ...w100,
  },
  caption: {
    ...textLite,
    ...marginBottom5,
  },
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