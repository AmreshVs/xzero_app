import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Row from 'components/row';
import SafeView from 'components/safeView';
import Button from 'components/button';
import { HOME_TAB_SCREEN } from 'navigation/routes';
import styles from './styles';

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