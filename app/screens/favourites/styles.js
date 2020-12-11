import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT } from 'constants/common';
import { w100, padding10, positionAbsolute, padding15, paddingBottom10, zIndex1, alignItemsCenter } from 'constants/commonStyles';

const styles = StyleSheet.create({
  flatlist: {
    paddingBottom: SCREEN_HEIGHT / 13,
    minHeight: '100%',
    paddingTop: 0,
    ...padding10,
  },
  clearButton: {
    bottom: 0,
    ...zIndex1,
    ...paddingBottom10,
    ...padding15,
    ...positionAbsolute,
    ...w100,
    ...alignItemsCenter
  },
  columnWrapper: {
    justifyContent: 'space-between'
  }
});

export default styles;