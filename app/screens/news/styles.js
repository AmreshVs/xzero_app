import { Platform, StyleSheet } from 'react-native';

import colors from "constants/colors";
import { getShadowStyle } from 'constants/commonFunctions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 700
  },
  newsImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  gradient: {
    width: '100%',
    height: 400,
    position: 'absolute',
    zIndex: 1
  },
  title: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 23
  },
  caption: {
    color: colors.text_lite,
    marginTop: 5,
    lineHeight: 25
  },
  dateCaption: {
    color: colors.white,
  },
  bookmarkContainer: {
    position: 'absolute',
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    paddingRight: 6,
    borderRadius: 30,
    overflow: 'hidden',
    zIndex: 2
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 10,
  },
  titleContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 50,
    zIndex: 2,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 10,
    zIndex: 2,
    paddingHorizontal: 10,
  },
  bookmark: {
    // ...getShadowStyle()
  }
});

export default styles;