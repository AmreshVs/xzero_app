import { StyleSheet } from 'react-native';

import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50
  },
  inputsContainer: {
    width: '100%',
    padding: 20,
  },
  forgotPassword: {
    color: colors.text_lite,
    textAlign: 'right',
    marginBottom: 20,
    marginTop: 10,
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialLoginContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 0,
  },
  loginOptionText: {
    color: colors.text_lite,
    marginBottom: 15,
  },
  noAccount: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  signup: {
    color: colors.primary,
    marginLeft: 5,
    fontWeight: '700',
  },
  skip: {
    color: colors.text_lite,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  termsContainer: {
    marginTop: 20,
    marginBottom: 30
  },
  terms: {
    color: colors.text_lite,
  },
  termsLink: {
    fontWeight: '700',
    color: colors.primary
  },
});

export default styles;
