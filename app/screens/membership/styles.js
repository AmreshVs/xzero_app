import { StyleSheet } from 'react-native';

import { getShadowStyle } from 'constants/commonFunctions';
import { SCREEN_HEIGHT } from 'constants/common';
import { colorWhite, h100, marginTop10, textBoldDark, textLite, marginTop5, margin10, w100, marginBottom5, textAlignLeft, wh100, padding15, borderRadius10, font18, positionAbsolute, flexSpaceBetween, colorDanger, marginTop0, paddingHorizontal10, marginHorizontal10, justifyContentCenter, alignItemsCenter, resizeModeContain, w200, h200 } from 'constants/commonStyles';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  safeContainer: {
    ...h100,
  },
  benefitsContainer: {
    marginVertical: 10,
    ...marginHorizontal10,
  },
  benefitsTitle: {
    ...textBoldDark,
  },
  benefitsText: {
    ...textLite,
    ...marginTop5,
  },
  buyMembershipContainer: {
    ...marginTop0,
    ...margin10,
  },
  buyMembershipText: {
    ...textLite,
  },
  helpContainer: {
    ...marginTop0,
    ...margin10,
  },
  infoContainer: {
    ...w100,
  },
  about: {
    ...marginBottom5,
    ...textAlignLeft,
    ...textBoldDark
  },
  helpCaption: {
    ...textLite,
    ...marginBottom5,
    ...w100
  },
  memberContainer: {
    height: 230,
    ...getShadowStyle(),
    ...paddingHorizontal10,
    ...marginTop10,
    ...w100,
  },
  gradient: {
    ...wh100,
    ...borderRadius10,
    ...padding15,
  },
  title: {
    fontWeight: '800',
    ...font18,
    ...colorWhite,
  },
  memberPlanTitle: {
    fontWeight: '800',
    textTransform: 'uppercase',
    ...font18,
    ...colorWhite,
  },
  cardName: {
    ...colorWhite,
  },
  logo: {
    width: 170,
    height: 170,
    opacity: 0.2,
    top: SCREEN_HEIGHT / 20,
    transform: [
      {
        scale: 2,
      },
    ],
    ...positionAbsolute,
  },
  textContainer: {
    ...h100,
    ...flexSpaceBetween,
  },
  serialContainer: {
    ...flexSpaceBetween,
    height: '50%',
  },
  noteContainer: {
    ...marginTop10,
    ...marginHorizontal10,
  },
  noteText: {
    ...textLite,
  },
  renewContainer: {
    ...marginTop0,
    ...margin10,
  },
  nenewText: {
    ...colorDanger,
  },
  qrcode: {
    ...w200,
    ...h200,
    ...resizeModeContain,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 10,
    borderRadius: 10
  },
  imageContainer: {
    ...justifyContentCenter,
    ...alignItemsCenter
  },
  modal: {
    backgroundColor: colors.lite_gray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  planCard: {
    margin: 10,
    marginBottom: 0,
    padding: 0,
  },
  planColor: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  planTitle: {
    color: colors.text_dark,
    fontWeight: '700',
    fontSize: 17
  },
  caption: {
    color: colors.text_lite
  },
  price: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 17
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: colors.gradient2,
  },
  ripplePlan: {
    padding: 10
  },
  footer: {
    borderTopWidth: 2,
    borderColor: '#EEE',
    padding: 10
  }
});

export default styles;