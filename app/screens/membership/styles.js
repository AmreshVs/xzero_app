import { Platform, StyleSheet } from 'react-native';

import { isTab, responsiveHeight } from 'constants/commonFunctions';
import { SCREEN_HEIGHT } from 'constants/common';
import { colorWhite, h100, marginTop10, textBoldDark, textLite, marginTop5, margin10, w100, marginBottom5, textAlignLeft, wh100, padding15, borderRadius10, font18, positionAbsolute, flexSpaceBetween, colorDanger, marginTop0, paddingHorizontal10, marginHorizontal10, justifyContentCenter, alignItemsCenter, resizeModeContain, w200, h200 } from 'constants/commonStyles';
import colors from 'constants/colors';

const mobileStyles = StyleSheet.create({
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
    lineHeight: 20
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
    ...w100,
    lineHeight: 20
  },
  memberContainer: {
    height: Platform?.OS === 'ios' ? responsiveHeight(27) : responsiveHeight(34),
    ...paddingHorizontal10,
    ...marginTop10,
    ...w100,
    overflow: 'hidden'
  },
  gradient: {
    ...wh100,
    ...borderRadius10,
    ...padding15,
  },
  title: {
    fontWeight: 'bold',
    ...font18,
    ...colorWhite,
  },
  memberPlanTitleContainer: {
    borderRadius: 5,
  },
  memberPlanTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    ...font18,
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
    lineHeight: 20
  },
  renewContainer: {
    ...marginTop0,
    ...margin10,
  },
  renewText: {
    ...colorDanger,
  },
  qrcode: {
    ...w200,
    ...h200,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 10,
    borderRadius: 10,
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
    color: colors.text_lite,
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
  },
  tabWrapper: {
    flexDirection: 'column'
  }
});

const tabStyles = StyleSheet.create({
  ...mobileStyles,
  buyMembershipContainer: {
    ...mobileStyles.buyMembershipContainer,
    width: '48%',
    marginLeft: 0
  },
  helpContainer: {
    ...mobileStyles.helpContainer,
    width: '48%'
  },
  qrContainer: {
    width: '48%',
    marginBottom: 10,
    marginLeft: 0
  },
  benefitsContainer: {
    ...mobileStyles.benefitsContainer,
    width: '48%'
  },
  membershipBenefits: {
    width: isTab() ? '48%' : '100%',
    marginRight: 0
  },
  promocode: {
    width: isTab() ? '48%' : '100%'
  },
  tabWrapper: {
    flexDirection: 'row',
  },
  planCard: {
    ...mobileStyles.planCard,
    width: '48%',
    marginRight: 0,
    flexWrap: 'wrap'
  },
  plansContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

const styles = isTab() ? tabStyles : mobileStyles;

export default styles;