import { StyleSheet } from 'react-native';

import { font15, fontWeight700, textLite } from 'constants/commonStyles';
import colors from 'constants/colors';
import { isTab } from 'constants/commonFunctions';

const styles = StyleSheet.create({
  flatlist: {
    padding: 10,
    paddingBottom: 50,
  },
  vouchers: {
    justifyContent: 'space-between'
  },
  voucherList: {
    width: isTab() ? '49.4%' : '100%',
    marginBottom: 10
  },
  voucherImage: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  title: {
    ...font15,
    ...fontWeight700,
  },
  caption: {
    marginLeft: 3,
    ...textLite
  },
  text: {
    textAlign: 'center',
    padding: 15,
    color: colors.text_dark
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
  cost: {
    fontSize: 17,
    color: colors.chip_1,
    fontWeight: '700',
    marginTop: 5
  }
});

export default styles;