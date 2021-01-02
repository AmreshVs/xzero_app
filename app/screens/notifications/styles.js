import { StyleSheet } from 'react-native';

import { textBoldDark, padding10, textLite, marginTop5, textAlignRight, justifyContentSpaceBetween } from 'constants/commonStyles';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  centers: {
    ...justifyContentSpaceBetween,
    ...padding10,
  },
  flatlist: {
    ...padding10,
  },
  title: {
    ...textBoldDark,
  },
  desc: {
    ...textLite,
    ...marginTop5,
  },
  timestamp: {
    ...textAlignRight,
    ...marginTop5,
    ...textLite,
  },
  container: {
    backgroundColor: '#eef8ff',
  },
  readContainer: {
    backgroundColor: colors.white,
  },
  unread: {
    width: 10,
    height: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 10
  }
});

export default styles;