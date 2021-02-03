import colors from 'constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
    marginBottom: 115
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
    opacity: 0.6,
  },
  chip: {
    color: colors.white,
    fontWeight: '700',
    padding: 10,
    paddingBottom: 19,
  },
  tab: {
    backgroundColor: colors.text_lite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    marginRight: 0
  },
  selectedTab: {
    backgroundColor: colors.chip_1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    marginRight: 0
  },
  tabs: {
    // height: 20,
    // width: '100%',
    // marginVertical: 10
  }
});

export default styles;