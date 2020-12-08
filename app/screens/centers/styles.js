import { StyleSheet } from 'react-native';

import colors from 'constants/colors';
import { getShadowStyle } from 'constants/commonFunctions';
import { w100, whiteBg, flexSpaceBetween, borderRadius10, font15, fontWeight700, textAlignCenter, overflowHidden, w100px, h100px, padding10, paddingBottom10, justifyContentSpaceBetween } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: -5,
    ...getShadowStyle(),
    ...flexSpaceBetween,
    ...borderRadius10,
    ...whiteBg
  },
  title: {
    ...font15,
    ...fontWeight700,
    ...textAlignCenter,
  },
  caption: {
    color: colors.chip_1,
    marginLeft: 3,
    ...textAlignCenter,
  },
  imgContainer: {
    ...w100,
    ...overflowHidden,
  },
  image: {
    resizeMode: 'contain',
    ...borderRadius10,
    ...w100px,
    ...h100px,
  },
  centers: {
    ...justifyContentSpaceBetween,
    ...padding10,
  },
  flatlist: {
    minHeight: '100%',
    ...paddingBottom10,
  },
  searchCaption: {
    margin: 5,
    marginBottom: 0,
    color: colors.text_dark
  },
  searchedText: {
    fontWeight: '700',
    color: colors.text_dark
  }
});

export default styles;