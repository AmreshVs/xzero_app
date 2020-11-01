import { StyleSheet, StatusBar } from 'react-native';

import colors from 'constants/colors';
import isIphoneX from 'components/bottomTab/isIphoneX';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white
  },
  inputsContainer: {
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  haveAccount: {
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signup: {
    color: colors.primary,
    marginLeft: 5,
    fontWeight: '700',
  },
  error: {
    color: colors.danger,
    paddingTop: 10,
  },
  btnContainer: {
    marginTop: 20,
  },
  termsContainer: {
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  terms: {
    color: colors.text_lite,
  },
  termsLink: {
    fontWeight: '700',
    color: colors.primary,
  },
  topNav: {
    position: 'absolute',
    zIndex: 9,
    top: 10,
    paddingTop: isIphoneX() ? StatusBar.currentHeight + 30 : 0
  },
});

export default styles;