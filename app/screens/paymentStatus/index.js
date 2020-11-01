import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Row from 'components/row';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/common';
import SafeView from 'components/safeView';
import { getShadowStyle } from 'constants/commonFunctions';
import Button from 'components/button';
import { HOME_TAB_SCREEN } from 'navigation/routes';

export default function PaymentStatus({ status = 1 }) {
  const { replace } = useNavigation();
  const { t } = useTranslation();

  return (
    <>
      <LinearGradient
        colors={status ? ['#039e2b', '#00d589'] : ['#9e0303', '#ff5468']}
        style={styles.gradient}
      />
      <SafeView style={styles.container}>
        <View style={styles.circleContainer}>
          <Row style={styles.circle} hcenter vcenter>
            <FontAwesomeIcon icon="check" size={50} color={colors.success} />
          </Row>
          <Text style={styles.title}>
            {status ? t('payment_successfull') : t('payment_failed')}
          </Text>
          <View style={styles.backButton}>
            <Button width="100%" onPress={() => replace(HOME_TAB_SCREEN)}>
              {t('back_to_home')}
            </Button>
          </View>
        </View>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.success,
    height: '100%',
    width: '100%',
  },
  circleContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: SCREEN_HEIGHT / 5.5,
    width: SCREEN_WIDTH / 2.5,
    backgroundColor: colors.white,
    borderRadius: SCREEN_WIDTH / 4,
    ...getShadowStyle(),
  },
  title: {
    color: colors.white,
    marginTop: 20,
    fontSize: 23,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 40,
    width: '70%',
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
