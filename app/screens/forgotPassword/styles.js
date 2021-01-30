import { StyleSheet } from 'react-native';

import { wh100, whiteBg, alignItemsCenter, padding20, h300, w300, marginBottom15 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...whiteBg
  },
  inputsContainer: {
    ...wh100,
    ...padding20,
  },
  email: {
    ...marginBottom15
  },
  image: {
    ...w300,
    ...h300
  },
  contentContainer: {
    ...alignItemsCenter
  },
});

export default styles;
