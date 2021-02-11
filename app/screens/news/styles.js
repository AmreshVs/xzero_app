import { StyleSheet } from 'react-native';

import colors from 'constants/colors';

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
  video: {
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  videoPlaceholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -2,
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
    height: 140
  },
  videoContainer: {
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6,
    zIndex: -1
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
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.7,
    height: 35,
  },
  selectedTab: {
    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 0,
    height: 35
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
  },
  articlesScrollView: {
    padding: 10,
    minWidth: '100%',
    minHeight: '100%',
  },
  noDataImage: {
    marginTop: 0
  },
  noDataContainer: {
    width: '100%',
    marginTop: -4
  },
  articles: {
    width: '100%'
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
  playIcon: {
    backgroundColor: '#0000009e',
    padding: 20,
    borderRadius: 50,
    paddingRight: -1
  }
});

export default styles;