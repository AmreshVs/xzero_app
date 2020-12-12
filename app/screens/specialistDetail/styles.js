import { StyleSheet } from 'react-native';

import colors from 'constants/colors';
import { SCREEN_HEIGHT } from 'constants/common';
import { padding10, positionAbsolute, wh100, marginTop10, w100, justifyContentCenter, alignItemsCenter, h150, w150, marginBottom10, h100, borderRadius10, textLite, fontWeight700, font18, textDark, textAlignCenter, marginLeft5, textAlignLeft, marginBottom5, overflowHidden, marginRight5, borderRadius20, colorWhite, w70p, w30p, marginTop5 } from 'constants/commonStyles';
import { isTab } from 'constants/commonFunctions';

const mobileStyles = StyleSheet.create({
  container: {
    ...padding10,
  },
  gradient: {
    ...positionAbsolute,
    ...wh100,
  },
  specialistImageContainer: {
    height: SCREEN_HEIGHT / 3,
    padding: 0,
    ...marginTop10,
    ...w100,
    ...justifyContentCenter,
    ...alignItemsCenter,
  },
  specialistImage: {
    borderRadius: 80,
    ...h150,
    ...w150,
    ...justifyContentCenter,
    ...alignItemsCenter,
    ...marginBottom10,
  },
  specialistImagebg: {
    opacity: 0.09,
    resizeMode: 'cover',
    ...h100,
    ...w100,
    ...positionAbsolute,
    ...borderRadius10,
  },
  caption: {
    ...marginTop5,
    ...textLite,
  },
  specializationCaption: {
    color: colors.chip_1,
    ...marginTop5,
    ...fontWeight700,
  },
  infoContainer: {
    ...w100,
  },
  title: {
    ...font18,
    ...fontWeight700,
    ...textDark,
    ...textAlignCenter,
  },
  location: {
    ...textLite,
    ...marginLeft5,
  },
  descText: {
    ...textLite,
    ...marginTop5,
  },
  callButton: {
    ...marginTop5,
  },
  about: {
    ...textDark,
    ...textAlignLeft,
    ...fontWeight700,
    ...marginBottom5,
  },
  imageContainer: {
    ...w30p,
  },
  image: {
    height: 100,
    ...w100,
    ...borderRadius10,
  },
  detailContainer: {
    paddingLeft: 10,
    ...w70p,
    ...overflowHidden,
  },
  icon: {
    ...marginTop5,
    ...marginRight5,
  },
  viewOffersContainer: {
    backgroundColor: colors.chip_1,
    ...padding10,
    ...marginTop10,
    ...borderRadius20,
    ...overflowHidden,
  },
  viewOffers: {
    ...textAlignCenter,
    ...colorWhite,
    ...fontWeight700,
  },
  noTopMargin: {
    marginTop: 0,
  },
  name: {
    ...fontWeight700,
  },
  place: {
    width: '90%',
  },
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  infoContainer: {
    width: '49.3%',
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;