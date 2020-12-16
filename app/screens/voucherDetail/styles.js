import { StyleSheet } from 'react-native';

import { font16, textAlignCenter, textBoldDark, textLite } from 'constants/commonStyles';
import { SCREEN_HEIGHT } from 'constants/common';
import { getShadowStyle, isTab } from 'constants/commonFunctions';
import colors from 'constants/colors';

const mobileStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imgContainer: {
    height: SCREEN_HEIGHT / 4,
    ...getShadowStyle(),
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover'
  },
  title: {
    ...textBoldDark,
    ...font16,
    marginBottom: 3
  },
  caption: {
    ...textLite
  },
  productImg: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    resizeMode: 'contain',
    marginBottom: 5
  },
  buyNowButton: {
    bottom: 60,
    padding: 10,
    alignItems: 'center'
  },
  continueButton: {
    width: '100%',
  },
  membershipImg: {
    width: '100%',
    height: 205,
    resizeMode: 'stretch',
    marginVertical: 5
  },
  voucherContainer: {
    marginBottom: 10,
    padding: 0,
  },
  voucherImageContainer: {
    width: '100%',
    height: 200,
  },
  voucherImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover'
  },
  infoTitle: {
    ...textBoldDark,
    ...font16,
    marginRight: 5
  },
  infoCaption: {
    ...textLite,
    ...textAlignCenter,
    marginTop: 2
  },
  modal: {
    backgroundColor: '#EEE',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  footer: {
    borderTopWidth: 2,
    borderColor: '#EEE',
    padding: 10,
    paddingBottom: 30,
    alignItems: 'center'
  },
  winners: {
    fontWeight: '700',
    color: colors.primary
  },
  closed: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.white,
    opacity: 0.5,
    position: 'absolute',
    zIndex: 1,
  },
  closedText: {
    color: colors.white,
    padding: 10,
    backgroundColor: colors.chip_2,
    borderRadius: 10,
    fontWeight: '700'
  },
  closedContainer: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  voucherImageContainer: {
    ...mobileStyles.voucherContainer,
    height: SCREEN_HEIGHT / 3.5,
  },
  membershipImg: {
    ...mobileStyles.membershipImg,
    height: SCREEN_HEIGHT / 4,
    resizeMode: 'contain',
    marginBottom: 10
  },
  rulesContainer: {
    width: '50%',
    marginRight: 0,
    marginBottom: 70
  },
  helpContainer: {
    width: '48.5%'
  },
  addressContainer: {
    width: '48%',
    marginRight: 0
  },
  promocodeContainer: {
    width: '48%',
    marginTop: 10
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;