import { StyleSheet } from 'react-native';

import { whiteBg, textBoldDark, font16, w300, h300, textAlignCenter, marginTop5, textLite, borderRadius10, w100, resizeModeContain, marginBottom0, justifyContentCenter, alignItemsCenter, positionAbsolute, borderRadius50, zIndex1, flexRow, justifyContentSpaceBetween, padding5 } from 'constants/commonStyles';
import { getShadowStyle } from 'constants/commonFunctions';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    ...whiteBg,
  },
  image: {
    ...w300,
    ...h300,
  },
  title: {
    ...textBoldDark,
    ...font16
  },
  caption: {
    ...textLite,
    ...marginTop5,
    ...textAlignCenter,
  },
  hcaption: {
    ...textLite,
  },
  giftImage: {
    height: 160,
    ...w100,
    ...resizeModeContain
  },
  availableGiftsContainer: {
    ...marginBottom0,
    ...getShadowStyle(),
    ...borderRadius10,
    ...whiteBg,
  },
  giftContainer: {
    width: '50%',
    ...padding5,
  },
  availedGiftContainer: {
    width: 200,
    ...padding5,
  },
  giftImageContainer: {
    ...justifyContentCenter,
    ...alignItemsCenter,
  },
  giftImages: {
    width: 90,
    height: 90,
    backgroundColor: colors.gradient2,
    opacity: 0.9,
    ...positionAbsolute,
    ...borderRadius50,
    ...zIndex1,
    ...getShadowStyle(),
  },
  wrapper: {
    flexWrap: 'wrap',
    ...flexRow,
    ...justifyContentSpaceBetween,
    ...padding5
  },
  availedWrapper: {
    ...padding5
  },
  heading: {
    ...textBoldDark,
    ...font16
  }
});

export default styles;