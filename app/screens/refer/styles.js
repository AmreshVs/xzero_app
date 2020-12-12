import colors from 'constants/colors';
import { isTab } from 'constants/commonFunctions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  share: {
    width: '100%',
    height: isTab() ? 550 : 400,
    marginBottom: -40,
    marginTop: -5
  },
  shareContainer: {
    padding: 10,
    paddingTop: 0,
    minHeight: '100%',
    justifyContent: 'center'
  },
  referTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text_dark
  },
  title: {
    fontWeight: '700',
    color: colors.text_dark,
    marginBottom: 3
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
  },
  referCaption: {
    color: colors.text_lite,
    textAlign: 'center'
  },
  countsContainer: {
    width: '31.5%',
    padding: 5,
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
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10
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
    alignItems: 'center',
    paddingVertical: 5
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