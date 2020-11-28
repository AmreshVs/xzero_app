import colors from 'constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  share: {
    width: '100%',
    height: 400,
    marginBottom: -40,
    marginTop: -5
  },
  shareContainer: {
    padding: 10,
    paddingTop: 0
  },
  referTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text_dark
  },
  title: {
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
    width: '48.7%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EEE',
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
  },
  historyContainer: {
    padding: 10
  },
  referContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  earned: {
    fontWeight: '700',
    color: colors.success,
  },
  withdrawAmt: {
    fontWeight: '700',
    color: colors.danger,
  },
  modal: {
    paddingBottom: 70,
    backgroundColor: '#EEE',
    borderRadius: 10
  }
});

export default styles;