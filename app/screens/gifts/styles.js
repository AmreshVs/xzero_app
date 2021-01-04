import { StyleSheet } from 'react-native';

import { whiteBg, textBoldDark, font16, w300, h300, textAlignCenter, marginTop5, textLite, borderRadius10, w100, resizeModeContain, marginBottom0, justifyContentCenter, alignItemsCenter, positionAbsolute, borderRadius50, zIndex1, flexRow, justifyContentSpaceBetween, padding5 } from 'constants/commonStyles';
import { getShadowStyle, isTab } from 'constants/commonFunctions';
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
  imageTitle: {
    color: colors.white,
    fontWeight: '700',
    marginBottom: 5
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
    height: 130,
    resizeMode: 'cover',
    ...w100,
    marginBottom: 10
  },
  availableGiftsContainer: {
    ...marginBottom0,
    ...getShadowStyle(),
    ...borderRadius10,
    ...whiteBg,
    padding: 0
  },
  giftContainer: {
    width: isTab() ? '33.2%' : '50%',
    ...padding5,
  },
  availedGiftContainer: {
    width: 200,
    ...padding5,
  },
  giftImageContainer: {
    ...justifyContentCenter,
    ...alignItemsCenter,
    padding: 10
  },
  giftImages: {
    width: 100,
    height: 100,
    backgroundColor: colors.gradient2,
    opacity: 1,
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
    alignItems: 'center',
    opacity: 1
  },
  giftRevealText: {
    ...textBoldDark,
  },
  sadIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  gift: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: '#000',
    height: '100%',
    width: '100%',
    zIndex: 2,
    borderRadius: 10,
    padding: 10,
    paddingTop: 25,
    opacity: 0.7
  },
  imageDesc: {
    color: '#FFF',
    zIndex: 999
  },
  closeContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    zIndex: 9,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#0000008a',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
    minHeight: 200
  },
  image: {
    width: 350,
    height: 500,
    resizeMode: 'cover'
  },
  btnContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2
  },
  winImage: {
    width: 350,
    height: 350,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  deliveredContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 5
  }
});

export default styles;