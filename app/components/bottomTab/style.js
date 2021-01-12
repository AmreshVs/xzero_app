import { StyleSheet } from 'react-native';

import colors from 'constants/colors';

const style = (insets) => StyleSheet.create({
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
  icon: {
    marginBottom: 0
  },
  iconContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerFocused: {
    borderRadius: 50,
    overflow: 'hidden',
    width: '100%',
    height: 40,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberIconContainer: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: -20,
    position: 'absolute',
    borderWidth: 7,
    borderColor: colors.primary_lite,
    backgroundColor: colors.primary,
  },
  memberIconContainerFocused: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: -20,
    position: 'absolute',
    borderWidth: 7,
    borderColor: colors.primary,
    backgroundColor: colors.lite_gray,
  },
  itemText: {
    position: 'absolute',
    bottom: -12,
    fontWeight: '700',
    marginHorizontal: -10
  }
});

export default style;