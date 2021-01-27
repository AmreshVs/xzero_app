import { StyleSheet } from 'react-native';

import colors from 'constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'constants/common';
import { padding10, textBoldDark, font17, marginBottom5, fontWeight700, textLite, w70p, paddingHorizontal10, w30p, marginTop10 } from 'constants/commonStyles';
import { isTab } from 'constants/commonFunctions';

const mobileStyles = StyleSheet.create({
  flatlist: {
    minHeight: '100%',
    paddingTop: 0,
    ...padding10,
  },
  container: {
    ...marginTop10,
  },
  imageContainer: {
    ...w30p,
  },
  image: {
    borderRadius: Math.round(SCREEN_WIDTH + SCREEN_HEIGHT) / 2,
    width: SCREEN_WIDTH * 0.27,
    height: SCREEN_WIDTH * 0.27,
  },
  infoContainer: {
    ...w70p,
    ...paddingHorizontal10,
  },
  name: {
    marginBottom: 2,
    ...font17,
    ...textBoldDark,
  },
  caption: {
    ...textLite,
    ...marginBottom5,
  },
  locationCaption: {
    ...textLite,
    ...marginBottom5,
    marginRight: 10
  },
  specialization: {
    color: colors.violet,
    ...fontWeight700,
    ...marginBottom5,
  },
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  specialists: {
    justifyContent: 'space-between'
  },
  image: {
    borderRadius: Math.round(SCREEN_WIDTH + SCREEN_HEIGHT) / 2,
    width: SCREEN_WIDTH * 0.14,
    height: SCREEN_WIDTH * 0.14,
  },
  container: {
    ...mobileStyles.container,
    width: '49.3%'
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;