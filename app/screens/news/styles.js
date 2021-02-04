import colors from 'constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 52
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
    height: 150
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
    paddingVertical: 13,
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
    opacity: 0.6
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
    marginRight: 0
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
    height: 93.2,
    width: '100%'
  },
  categories: {
    paddingRight: 10
  }
});

export default styles;