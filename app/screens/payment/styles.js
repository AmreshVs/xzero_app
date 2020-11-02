import { StyleSheet } from 'react-native';

import { wh100, w50, alignItemsCenter, justifyContentCenter, overflowHidden, borderRadius70, flex1 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...wh100,
  },
  rightIcon: {
    ...flex1,
    ...borderRadius70,
    ...w50,
    ...alignItemsCenter,
    ...justifyContentCenter,
    ...overflowHidden,
  },
});

export default styles;