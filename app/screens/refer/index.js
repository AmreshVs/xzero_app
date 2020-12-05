import React, { useContext, useRef, useState } from 'react';
import { ScrollView, Text, View, Share } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import LottieView from 'lottie-react-native';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import colors from 'constants/colors';
import Row from 'components/row';
import Box from 'components/box';
import Button from 'components/button';
import RippleFX from 'components/rippleFx';
import ReferHistory from './referHistory';
import styles from './styles';
import Withdraw from './withdraw';
import Column from 'components/column';
import { UserDataContext } from 'context';
import { GET_REFER_HISTORY } from 'graphql/queries';

export default function Refer() {
  const [modalComp, setModalComp] = useState(false);
  const [playAnim, setPlayAnim] = useState(true);
  const shareRef = useRef(null);
  const modalizeRef = useRef(null);
  const { userData } = useContext(UserDataContext);
  const { data, loading } = useQuery(GET_REFER_HISTORY, {
    variables: {
      user_id: Number(userData?.id)
    }
  });

  const handleOpenModal = (status) => {
    setModalComp(status);
    modalizeRef.current?.open();
  };

  const handlePlayAnim = () => {
    if (shareRef.current) {
      if (playAnim) {
        shareRef.current.reset();
        setPlayAnim(!playAnim);
        return;
      }
      shareRef.current.play();
      setPlayAnim(!playAnim);
    }
  }

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
    <SafeView style={styles.container} loading={loading} topNav>
      <TopNavigator title="Refer and Earn" gradient />
      <ScrollView contentContainerStyle={styles.shareContainer}>
        <Box alignItems="center">
          <RippleFX onPress={handlePlayAnim}>
            <LottieView
              ref={shareRef}
              style={styles.share}
              source={require("../../../assets/share.json")}
              autoPlay
            />
          </RippleFX>
          <Text style={styles.referTitle}>Your Referral Code is</Text>
          <View style={styles.gradient}>
            <Text style={styles.code}>{data?.GetReferHistory?.referralCode}</Text>
          </View>
          <Text style={styles.caption}>{`Refer the app to your friends and family members. While buying membership or paying for voucher ask them to use this code to get discount. And you will receive the discounted amount to your xzero account.\nRefer and start Earning now!`}</Text>
        </Box>
        <Row justifyContent="space-between" marginTop={10}>
          <Column style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor="#d8ddfe">
              <FontAwesomeIcon icon="bullhorn" size={25} color={colors.chip_1} />
            </Box>
            <Box width="100%">
              <Text style={styles.count}>{data?.GetReferHistory?.totalReferred || 0}</Text>
              <Text style={styles.referCaption}>Total Referred</Text>
            </Box>
          </Column>
          <Column style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor="#fee5d0">
              <FontAwesomeIcon icon="money-bill-wave" size={25} color={colors.chip_2} />
            </Box>
            <Box width="100%">
              <Text style={styles.count}>{data?.GetReferHistory?.totalEarned} AED</Text>
              <Text style={styles.referCaption}>Total Earned</Text>
            </Box>
          </Column>
          <Column style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor="#fbcfd0">
              <FontAwesomeIcon icon="coins" size={25} color={colors.danger} />
            </Box>
            <Box width="100%">
              <Text style={styles.count}>{data?.GetReferHistory?.balance || 0} AED</Text>
              <Text style={styles.referCaption}>Wallet Balance</Text>
            </Box>
          </Column>
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