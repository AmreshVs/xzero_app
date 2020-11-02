import { StyleSheet } from 'react-native';

import { colorWhite, h100, textBoldDark, font16, textLite, textAlignCenter, marginTop5 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...colorWhite,
    ...h100,
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: -30,
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
});

export default styles;