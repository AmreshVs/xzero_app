import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT } from 'constants/common';
import { w100, padding10, positionAbsolute, padding15, paddingBottom10, zIndex1 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  flatlist: {
    paddingBottom: SCREEN_HEIGHT / 13,
    ...padding10
  },
  clearButton: {
    bottom: 0,
    ...zIndex1,
    ...paddingBottom10,
    ...padding15,
    ...positionAbsolute,
    ...w100
  },
});

export default styles;