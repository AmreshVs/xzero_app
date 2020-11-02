import { StyleSheet } from 'react-native';

import { whiteBg, textBoldDark, font16, h100, w300, h300, textAlignCenter, marginTop5, textLite } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...whiteBg,
    ...h100
  },
  image: {
    ...w300,
    ...h300,
  },
  title: {
    ...textBoldDark,
    ...font16
  },
  caption: {
    ...textLite,
    ...marginTop5,
    ...textAlignCenter,
  },
});

export default styles;