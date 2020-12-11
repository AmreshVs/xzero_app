import { StyleSheet } from 'react-native';

import { getShadowStyle } from 'constants/commonFunctions';
import { justifyContentSpaceBetween, padding10, borderRadius10, whiteBg, w100, resizeModeCover, textBoldDark, textLite, h100 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  centers: {
    ...justifyContentSpaceBetween,
  },
  flatlist: {
    ...padding10,
    ...h100,
  },
  container: {
    height: 180,
    width: '48.7%',
    marginBottom: 10,
    ...whiteBg,
    ...borderRadius10,
    ...getShadowStyle(),
  },
  image: {
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...resizeModeCover,
    ...w100,
  },
  heading: {
    marginBottom: 5,
    ...textBoldDark,
  },
  caption: {
    ...textLite,
  },
});

export default styles;