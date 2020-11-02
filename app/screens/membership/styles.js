import { StyleSheet } from 'react-native';

import { getShadowStyle } from 'constants/commonFunctions';
import { SCREEN_HEIGHT } from 'constants/common';
import { colorWhite, h100, marginTop10, textBoldDark, textLite, marginTop5, margin10, w100, marginBottom5, textAlignLeft, wh100, padding15, borderRadius10, font18, positionAbsolute, flexSpaceBetween, colorDanger, marginBottom0, paddingHorizontal10, marginHorizontal10 } from 'constants/commonStyles';

const styles = StyleSheet.create({
  rootContainer: {
    ...h100,
  },
  benefitsContainer: {
    ...marginTop10,
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
    ...margin10,
    ...marginBottom0,
  },
  buyMembershipText: {
    ...textLite,
  },
  helpContainer: {
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
    ...marginBottom5
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
    ...marginHorizontal10,
    ...marginBottom0,
    ...marginTop10,
  },
  nenewText: {
    ...colorDanger,
  },
});

export default styles;