import { Platform, StyleSheet } from 'react-native';

import { SCREEN_HEIGHT } from 'constants/common';
import { w100, padding10, positionAbsolute, padding15, paddingBottom10, zIndex1, alignItemsCenter } from 'constants/commonStyles';

const styles = StyleSheet.create({
  flatlist: {
    paddingBottom: 60,
    minHeight: '100%',
    paddingTop: 0,
    ...padding10,
  },
  clearButton: {
    bottom: 50,
    paddingHorizontal: 10,
    ...zIndex1,
    ...paddingBottom10,
    ...positionAbsolute,
    ...w100,
    ...alignItemsCenter
  },
  columnWrapper: {
    justifyContent: 'space-between'
  }
});

export default styles;