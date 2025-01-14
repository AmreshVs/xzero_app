import { StyleSheet } from 'react-native';

import { colorWhite, textBoldDark, font16, textLite, marginBottom10, padding0, w100, h200, overflowHidden, padding10, wh100, resizeModeCover, positionAbsolute, paddingHorizontal10, fontWeight700 } from 'constants/commonStyles';
import colors from 'constants/colors';
import { isTab } from 'constants/commonFunctions';

const mobileStyles = StyleSheet.create({
  vouchersScrollView: {
    ...padding10,
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: -30,
  },
  title: {
    marginRight: 5,
    ...textBoldDark,
    ...font16,
  },
  caption: {
    marginTop: 2,
    ...textLite,
  },
  voucherContainer: {
    ...marginBottom10,
    ...padding0,
  },
  voucherImageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...w100,
    ...h200,
    ...overflowHidden,
  },
  voucherImg: {
    ...wh100,
    ...resizeModeCover
  },
  costContainer: {
    bottom: 10,
    backgroundColor: colors.danger,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    ...padding10,
    ...paddingHorizontal10,
    ...positionAbsolute,
  },
  cost: {
    ...fontWeight700,
    ...colorWhite
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
  },
  textContainer: {
    width: '50%',
    backgroundColor: colors.white,
    borderBottomWidth: 5,
    borderColor: '#CCC'
  },
  selectedText: {
    color: colors.primary,
    fontWeight: '700'
  },
  selectedBorder: {
    borderColor: colors.primary
  },
  text: {
    textAlign: 'center',
    padding: 15,
    color: colors.text_dark
  },
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  vouchers: {
    justifyContent: 'space-between'
  },
  voucherContainer: {
    ...mobileStyles.voucherContainer,
    width: '49.3%'
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;