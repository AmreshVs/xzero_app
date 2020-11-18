import { StyleSheet } from 'react-native';

import { whiteBg, textBoldDark, font16, w300, h300, textAlignCenter, marginTop5, textLite, borderRadius10, w100, resizeModeContain, marginBottom0, justifyContentCenter, alignItemsCenter, positionAbsolute, borderRadius50, zIndex1, flexRow, justifyContentSpaceBetween, padding5 } from 'constants/commonStyles';
import { getShadowStyle } from 'constants/commonFunctions';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  image: {
    ...w300,
    ...h300,
  },
  title: {
    ...textBoldDark,
    ...font16,
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
  giftRevealImage: {
    width: 80,
    height: 80,
    backgroundColor: colors.chip_1,
    opacity: 0.9,
    ...positionAbsolute,
    ...borderRadius50,
    ...zIndex1,
    ...getShadowStyle(),
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  generateGift: {
    width: '100%',
    zIndex: 1
  },
  confetti: {
    width: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  lottieGiftContainer: {
    margin: 10,
  },
  generate: {
    alignItems: 'center'
  },
  hideOverflow: {
    overflow: 'hidden'
  },
  giftReveal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  giftRevealText: {
    ...textBoldDark
  },
  sadIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  gift: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: '#000',
    height: '100%',
    width: '100%',
    zIndex: 1,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    paddingTop: 25,
    opacity: 0.7
  },
  imageDesc: {
    color: '#FFF'
  },
  closeContainer: {
    position: 'absolute',
    right: 10,
    top: 10
  },
});

export default styles;