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
    marginTop: 2
  },
  timestamp: {
    ...textAlignRight,
    ...marginTop5,
    ...textLite,
    fontSize: 11
  },
  container: {
    backgroundColor: '#eef8ff',
    marginBottom: 10
  },
  readContainer: {
    backgroundColor: colors.white,
    marginBottom: 10
  },
  unread: {
    width: 10,
    height: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    position: 'absolute',
    right: 5,
    top: 5
  }
});

export default styles;