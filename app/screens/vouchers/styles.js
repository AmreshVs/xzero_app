import { StyleSheet } from 'react-native';

import { colorWhite, h100, textBoldDark, font16, textLite, textAlignCenter, marginTop5 } from 'constants/commonStyles';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  vouchersScrollView: {
    padding: 10,
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: -30,
  },
  title: {
    ...textBoldDark,
    ...font16,
    marginRight: 5
  },
  caption: {
    ...textLite,
    ...textAlignCenter,
    marginTop: 2
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
  costContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: colors.danger,
    padding: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  cost: {
    fontWeight: '800',
    color: '#FFF'
  },
});

export default styles;