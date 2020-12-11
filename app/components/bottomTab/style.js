import { StyleSheet } from 'react-native';

import colors from 'constants/colors';

const style = (insets, history = 1) => StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingBottom: insets.bottom,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  iconContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    paddingBottom: 20,
    width: '100%',
    paddingTop: 5,
    alignItems: 'center'
  },
  memberIconContainer: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: -10,
    position: 'absolute',
    borderWidth: 7,
    borderColor: colors.primary_lite,
    backgroundColor: colors.primary,
  },
  itemText: {
    position: 'absolute',
    bottom: history === 1 ? 5 : -12,
    fontWeight: '700',
    marginHorizontal: -10
  }
});

export default style;