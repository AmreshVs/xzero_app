import { StyleSheet } from 'react-native';

import { textBoldDark, padding10, textLite, marginTop5, textAlignRight, justifyContentSpaceBetween } from 'constants/commonStyles';

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
});

export default styles;