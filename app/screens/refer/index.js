import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './styles';
import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'constants/colors';
import Row from 'components/row';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Box from 'components/box';
import Button from 'components/button';

export default function Refer() {
  const shareRef = useRef(null);

  useEffect(() => {
    if (shareRef.current) {
      shareRef.current.play();
    }
  }, []);

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title="Refer and Earn" gradient />
      <View style={styles.shareContainer}>
        <LottieView
          ref={shareRef}
          style={styles.share}
          source={require("../../../assets/share.json")}
        />
        <Text style={styles.referTitle}>Your Referral Code is</Text>
        <View style={styles.gradient}>
          <Text style={styles.code}>ASD0SA57</Text>
        </View>
        <Text style={styles.caption}>{`Refer the app to your friends and family members. While buying membership or paying for voucher ask them to use this code to get discount. And you will receive the discounted amount to your xzero account.\nRefer and start Earning now!`}</Text>
        <Row marginTop={10}>
          <Row style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor={colors.chip_1}>
              <FontAwesomeIcon icon="bullhorn" size={25} color="#FFF" />
            </Box>
            <Box width="70%">
              <Text style={styles.count}>50</Text>
              <Text style={styles.caption}>Total Referred</Text>
            </Box>
          </Row>
          <Row style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor={colors.chip_2}>
              <FontAwesomeIcon icon="money-bill-wave" size={25} color="#FFF" />
            </Box>
            <Box width="70%">
              <Text style={styles.count}>200 AED</Text>
              <Text style={styles.caption}>Total Earned</Text>
            </Box>
          </Row>
        </Row>
        <Row style={styles.check} justifyContent="space-between">
          <Button width="49%" status="chip_1" icon="history">Refer History</Button>
          <Button width="49%" status="chip_2" icon="coins">Withdraw</Button>
        </Row>
        <Box marginTop={10} width="100%">
          <Button icon="share-alt">Refer / Earn Now</Button>
        </Box>
      </View>
    </SafeView>
  )
}