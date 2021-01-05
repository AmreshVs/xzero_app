import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import SafeView from 'components/safeView';
import Button from 'components/button';
import colors from 'constants/colors';
import { HOME_SCREEN } from 'navigation/routes';
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
          <Box style={styles.circle}>
            <FontAwesomeIcon icon={paymentStatus ? 'check' : 'times'} size={50} color={paymentStatus ? colors.success : colors?.danger} />
          </Box>
          <Text style={styles.title}>
            {paymentStatus ? t('payment_successfull') : t('payment_failed')}
          </Text>
          <View style={styles.backButton}>
            <Button width="100%" onPress={() => replace ? replace(HOME_SCREEN) : navigate(HOME_SCREEN)}>
              {t('back_to_home')}
            </Button>
          </View>
        </View>
      </SafeView>
    </>
  );
}