import { StyleSheet } from 'react-native';

import colors from 'constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'constants/common';
import { justifyContentSpaceBetween, padding10, marginBottom10, textBoldDark, font17, marginBottom5, fontWeight700, textLite, w70p, paddingHorizontal10, w30p } from 'constants/commonStyles';

const styles = StyleSheet.create({
  centers: {
    ...justifyContentSpaceBetween,
  },
  flatlist: {
    ...padding10,
  },
  container: {
    ...marginBottom10,
  },
  imageContainer: {
    ...w30p,
  },
  image: {
    borderRadius: Math.round(SCREEN_WIDTH + SCREEN_HEIGHT) / 2,
    width: SCREEN_WIDTH * 0.27,
    height: SCREEN_WIDTH * 0.27,
  },
  infoContainer: {
    ...w70p,
    ...paddingHorizontal10,
  },
  name: {
    marginBottom: 2,
    ...font17,
    ...textBoldDark,
  },
  caption: {
    ...textLite,
    ...marginBottom5,
  },
  specialization: {
    color: colors.violet,
    ...fontWeight700,
    ...marginBottom5,
  },
  icon: {
    marginRight: 3,
  },
});

export default styles;