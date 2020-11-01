import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import colors from 'constants/colors';
import { SCREEN_HEIGHT } from 'constants/common';
import Row from 'components/row';
import Column from 'components/column';
import { getShadowStyle, firstLetterUpper, getFormatedDate } from 'constants/commonFunctions';

export default function MembershipCard({ member, data, expired }) {
  const { t } = useTranslation();

  return (
    <Box style={styles.memberContainer}>
      <LinearGradient
        colors={
          expired ? [colors.text_lite, colors.text_lite] : [colors.gradient1, colors.gradient2]
        }
        style={styles.gradient}
      >
        <Row hcenter>
          <Image source={require('../../../assets/loader.gif')} style={styles.logo} />
        </Row>
        <View style={styles.textContainer}>
          <Row spaceBetween vcenter>
            <Text style={styles.title}>XZERO</Text>
            <Text style={styles.cardName}>{t('membership_card')}</Text>
          </Row>
          <View style={styles.serialContainer}>
            <Row spaceBetween>
              <Column>
                <Text style={styles.cardName}>{t('member_id')}</Text>
                <Text style={styles.title}>{member ? data?.serial || '' : 'XXXX-XXXX-XXXX'}</Text>
              </Column>
            </Row>
            <Row spaceBetween>
              <Column>
                <Text style={styles.cardName}>{t('belongs_to')}</Text>
                <Text style={styles.title}>
                  {member ? firstLetterUpper(data?.user?.username) || '' : 'XXXXXXX'}
                </Text>
              </Column>
              <Column>
                <Text style={styles.cardName}>{t('expiry')}</Text>
                <Text style={styles.title}>
                  {member ? getFormatedDate(new Date(data?.expiry)) : 'XX/XX/XXXX'}
                </Text>
              </Column>
            </Row>
          </View>
        </View>
      </LinearGradient>
    </Box>
  );
}

const whiteColor = {
  color: colors.white,
};

const styles = StyleSheet.create({
  memberContainer: {
    height: 230,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    ...getShadowStyle(),
  },
  gradient: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    ...whiteColor,
  },
  cardName: {
    ...whiteColor,
  },
  logo: {
    width: 170,
    height: 170,
    position: 'absolute',
    opacity: 0.2,
    top: SCREEN_HEIGHT / 20,
    transform: [
      {
        scale: 2,
      },
    ],
  },
  textContainer: {
    justifyContent: 'space-between',
    height: '100%',
  },
  serialContainer: {
    justifyContent: 'space-between',
    height: '50%',
  },
});
