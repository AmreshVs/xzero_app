import colors from 'constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: '100%',
    padding: 20
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain'
  },
  caption: {
    color: colors.text_lite,
    textAlign: 'center'
  },
  textbox: {
    width: 41,
    borderRadius: 5,
    marginHorizontal: 10
  }
});

export default styles;