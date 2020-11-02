import { StyleSheet } from 'react-native';

import { whiteBg, h100, w300, textBoldDark, font16, textLite, marginTop5, textAlignCenter, marginTop10, h300 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...whiteBg,
    ...h100,
  },
  image: {
    ...w300,
    ...h300,
  },
  title: {
    ...textBoldDark,
    ...font16,
  },
  caption: {
    ...textLite,
    ...marginTop5,
    ...textAlignCenter,
  },
  button: {
    paddingHorizontal: 30,
  },
  btnContainer: {
    ...marginTop10,
  },
});

export default styles;