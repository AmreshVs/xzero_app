import colors from 'constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFF',
  },
  share: {
    width: '100%',
    height: 400,
    marginBottom: -40,
    marginTop: -5
  },
  shareContainer: {
    alignItems: 'center',
    padding: 10,
    paddingTop: 0
  },
  referTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text_dark
  },
  gradient: {
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.primary
  },
  code: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20
  },
  caption: {
    color: colors.text_lite,
    textAlign: 'center'
  },
  countsContainer: {
    width: '49%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EEE',
    marginHorizontal: 5,
  },
  count: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
    color: colors.text_dark,
    textAlign: 'center'
  },
  iconContainer: {
    width: '30%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  check: {
    width: '100%',
    marginTop: 10
  }
});

export default styles;