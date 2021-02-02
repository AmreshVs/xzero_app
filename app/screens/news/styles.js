import colors from 'constants/colors';
import { responsiveHeight } from 'constants/commonFunctions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  image: {
    width: '100%',
    height: 127,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  videoImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 15,
    color: colors.text_dark,
    fontWeight: '700'
  },
  caption: {
    color: colors.text_lite,
    textAlign: 'right',
    fontSize: 12,
    marginTop: 5
  },
  articleContainer: {
    marginBottom: 10
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: -1,
  }
});

export default styles;