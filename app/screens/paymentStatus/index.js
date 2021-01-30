import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import SafeView from 'components/safeView';
import Button from 'components/button';
import colors from 'constants/colors';
import { HOME_SCREEN } from 'navigation/routes';
import Icon from 'icon';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

export default function PaymentStatus({ status = 1 }) {
  const { replace, navigate } = useNavigation();
  const { params } = useRoute();
  const { t } = useTranslation();

  let paymentStatus = params?.status !== undefined ? params?.status : status;

  return (
    <>
      <LinearGradient
        colors={paymentStatus ? ['#039e2b', '#00d589'] : ['#9e0303', '#ff5468']}
        style={styles.gradient}
      />
      <SafeView style={styles.container}>
        <View style={styles.circleContainer}>
          <ScaleAnim style={styles.circle}>
            <Icon name={paymentStatus ? 'check' : 'times'} size={50} color={paymentStatus ? colors.success : colors?.danger} />
          </ScaleAnim>
          <FadeInUpAnim delay={100}>
            <Text style={styles.title}>
              {paymentStatus ? t('payment_successfull') : t('payment_failed')}
            </Text>
          </FadeInUpAnim>
          <ScaleAnim style={styles.backButton} delay={200}>
            <Button width="100%" onPress={() => replace ? replace(HOME_SCREEN) : navigate(HOME_SCREEN)}>
              {t('back_to_home')}
            </Button>
          </ScaleAnim>
        </View>
      </SafeView>
    </>
  );
}