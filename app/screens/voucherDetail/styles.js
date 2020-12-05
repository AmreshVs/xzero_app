import { StyleSheet } from 'react-native';

import { font16, textAlignCenter, textBoldDark, textLite } from 'constants/commonStyles';
import { SCREEN_HEIGHT } from 'constants/common';
import { getShadowStyle } from 'constants/commonFunctions';

const styles = StyleSheet.create({
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
    padding: 10
  },
  continueButton: {
    width: '100%',
  },
  membershipImg: {
    width: '100%',
    height: 220,
    resizeMode: 'center',
    marginBottom: 5
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
    paddingBottom: 30
  }
});

export default styles;