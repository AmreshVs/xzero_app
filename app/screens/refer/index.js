import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, Share } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import LottieView from 'lottie-react-native';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import colors from 'constants/colors';
import Row from 'components/row';
import Box from 'components/box';
import Button from 'components/button';
import ReferHistory from './referHistory';
import styles from './styles';
import Withdraw from './withdraw';

export default function Refer() {
  const [modalComp, setModalComp] = useState(false);
  const shareRef = useRef(null);
  const modalizeRef = useRef(null);

  const handleOpenModal = (status) => {
    setModalComp(status);
    modalizeRef.current?.open();
  };

  useEffect(() => {
    if (shareRef.current) {
      shareRef.current.play();
    }
  }, []);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share and Earn by refer',
        url: 'https://xzero.app',
        title: 'Refer your friends',
        subject: 'Refer your friends, family and earn rewards',
        tintColor: colors.primary,
        dialogTitle: 'Refer your friends'
      });
      console.log(result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <SafeView style={styles.container} topNav>
      <TopNavigator title="Refer and Earn" gradient />
      <ScrollView contentContainerStyle={styles.shareContainer}>
        <Box alignItems="center">
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
        </Box>
        <Row justifyContent="space-between" marginTop={10}>
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
          <Button width="49%" status="chip_1" icon="history" onPress={() => handleOpenModal(true)}>Refer History</Button>
          <Button width="49%" status="chip_2" icon="coins" onPress={() => handleOpenModal(false)}>Withdraw</Button>
        </Row>
        <Box marginTop={10} width="100%">
          <Button icon="share-alt" onPress={() => handleShare()}>Refer & Earn Now</Button>
        </Box>
      </ScrollView>
      <Modalize ref={modalizeRef} childrenStyle={styles.modal} snapPoint={400} scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}>
        {modalComp ?
          <ReferHistory />
          :
          <Withdraw />
        }
      </Modalize>
    </SafeView>
  )
}