import colors from 'constants/colors';
import { SCREEN_HEIGHT } from 'constants/common';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  offline: {
    height: SCREEN_HEIGHT / 2,
    transform: [{ scale: Platform.OS === 'ios' ? 1 : 1.4 }],
    top: -20
  }
});

export default styles;