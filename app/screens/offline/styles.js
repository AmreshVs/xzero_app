import { SCREEN_HEIGHT } from 'constants/common';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offline: {
    height: SCREEN_HEIGHT / 2,
    transform: [{ scale: 1.4 }],
    top: -20
  }
});

export default styles;