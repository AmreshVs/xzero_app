import { Platform, StyleSheet } from 'react-native';

import colors from 'constants/colors';
import { isTab } from 'constants/commonFunctions';
import { SCREEN_HEIGHT } from 'constants/common';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  videoImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  title: {
    fontSize: 15,
    color: colors.text_dark,
    fontWeight: '700'
  },
  caption: {
    color: colors.text_lite,
    textAlign: 'right',
    fontSize: 13,
    marginLeft: 5
  },
  articleContainer: {
    marginBottom: 10,
    height: 130
  },
  videoContainer: {
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6,
  },
  chipContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chip: {
    color: colors.text_lite,
    fontWeight: '700',
    marginLeft: 5,
  },
  chipText: {
    fontSize: 12
  },
  tab: {
    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 14,
    opacity: 0.6,
    height: 37
  },
  selectedTab: {
    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    marginTop: 0,
    marginBottom: 14,
    marginRight: 0,
    height: 37
  },
  selectedChip: {
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 5,
  },
  bookmark: {
    padding: 10,
    borderRadius: 30,
    overflow: 'hidden',
    margin: -10
  },
  gradient: {
    position: 'absolute',
    width: '100%',
  },
  categories: {
    paddingRight: 10,
    height: 50,
  },
  articlesScrollView: {
    padding: 10,
    marginBottom: 50
  }
});

export default styles;