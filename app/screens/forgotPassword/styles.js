import { StyleSheet } from 'react-native';

import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  inputsContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  email: {
    marginBottom: 15
  },
  image: {
    width: 300,
    height: 300
  },
  contentContainer: {
    alignItems: 'center'
  }
});

export default styles;
