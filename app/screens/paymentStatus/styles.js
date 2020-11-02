import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/common';
import { getShadowStyle } from 'constants/commonFunctions';
import { wh100, h100, alignItemsCenter, justifyContentCenter, whiteBg, colorWhite, marginTop20, fontWeight700, positionAbsolute, w70p } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...wh100,
  },
  circleContainer: {
    ...h100,
    ...alignItemsCenter,
    ...justifyContentCenter,
  },
  circle: {
    height: SCREEN_HEIGHT / 5.5,
    width: SCREEN_WIDTH / 2.5,
    borderRadius: SCREEN_WIDTH / 4,
    ...whiteBg,
    ...getShadowStyle(),
  },
  title: {
    fontSize: 23,
    ...marginTop20,
    ...fontWeight700,
    ...colorWhite,
  },
  backButton: {
    marginTop: 40,
    ...w70p,
  },
  gradient: {
    ...positionAbsolute,
    ...wh100,
  },
});

export default styles;