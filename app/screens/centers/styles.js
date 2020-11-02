import { StyleSheet } from 'react-native';

import colors from 'constants/colors';
import { getShadowStyle } from 'constants/commonFunctions';
import { SCREEN_WIDTH } from 'constants/common';
import { w100, h100, whiteBg, flexSpaceBetween, borderRadius10, font15, fontWeight700, textAlignCenter, overflowHidden } from 'constants/commonStyles';

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
    height: SCREEN_WIDTH / 3,
    ...w100,
    ...overflowHidden,
  },
  image: {
    width: '90%',
    ...borderRadius10,
    ...h100,
  },
});

export default styles;