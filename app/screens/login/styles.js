import { StyleSheet } from 'react-native';

import { wh100, whiteBg, w150, h150, padding20, w100, textLite, textAlignRight, flex, flexRow, justifyContentCenter, alignItemsCenter, flexSpaceBetween, marginLeft5, fontWeight700, positionAbsolute, marginTop20, colorPrimary, padding15, borderRadius10, marginTop10, marginBottom20, marginBottom15 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...wh100,
    ...whiteBg,
  },
  logo: {
    ...w150,
    ...h150,
    marginTop: 50
  },
  inputsContainer: {
    ...w100,
    ...padding20,
  },
  forgotPassword: {
    ...marginBottom20,
    ...textAlignRight,
    ...marginTop10,
    ...textLite
  },
  btnContainer: {
    ...w100,
    ...flex,
    ...flexRow,
    ...flexSpaceBetween,
  },
  socialLoginContainer: {
    ...w100,
    ...justifyContentCenter,
    ...alignItemsCenter,
    ...padding20,
    paddingVertical: 0,
  },
  loginOptionText: {
    ...marginBottom15,
    ...textLite,
  },
  noAccount: {
    marginTop: 15,
    ...flexRow,
    ...justifyContentCenter,
  },
  signup: {
    ...colorPrimary,
    ...marginLeft5,
    ...fontWeight700,
  },
  skip: {
    top: 10,
    right: 10,
    ...positionAbsolute,
    ...textLite,
  },
  termsContainer: {
    marginBottom: 30,
    ...marginTop20,
  },
  terms: {
    ...textLite,
  },
  termsLink: {
    ...fontWeight700,
    ...colorPrimary
  },
  button: {
    backgroundColor: '#000',
    margin: 5,
    marginTop: 0,
    ...borderRadius10,
    ...padding15,
  },
  appleBtnContainer: {
    ...flexRow
  }
});

export default styles;
