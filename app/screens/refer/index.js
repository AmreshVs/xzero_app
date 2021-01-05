import React, { useContext, useRef, useState, memo } from 'react';
import { ScrollView, Text, View, Share, RefreshControl, Image, Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import colors from 'constants/colors';
import Row from 'components/row';
import Box from 'components/box';
import Button from 'components/button';
import RippleFX from 'components/rippleFx';
import Column from 'components/column';
import { ToastMsg } from 'components/toastMsg';
import { getAuthenticationHeader, isTab } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import IsLoggedIn from 'hoc/isLoggedIn';
import { GET_REFER_HISTORY } from 'graphql/queries';
import { REFER } from 'navigation/routes';
import ReferHistory from './referHistory';
import Withdraw from './withdraw';
import styles from './styles';

const Refer = () => {
  const [modalComp, setModalComp] = useState(false);
  const [playAnim, setPlayAnim] = useState(true);
  const [reloading, setReloading] = useState(false);
  const shareRef = useRef(null);
  const modalizeRef = useRef(null);
  const { logError } = useErrorLog();
  const { userData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();

  const queryInput = {
    user_id: Number(userData?.id || 0)
  };

  const { data, loading, refetch: _refetch, error } = useQuery(GET_REFER_HISTORY, {
    variables: queryInput,
    ...getAuthenticationHeader(userData?.jwt)
  });

  let refer = data?.GetReferHistory;

  if (error) {
    console.log('Get Refer Error', error);
    ToastMsg(t('error_occured'));
    logError({
      screen: REFER,
      module: 'Get Refer',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

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

  const reload = () => {
    setReloading(true);
    _refetch();
    setReloading(false);
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${t('refer_1')} *${refer?.referralCode}*\n${t('refer_2')} ${refer?.referProgram?.discount}% ${t('refer_3')} ${refer?.referProgram?.allowed_maximum_discount} ${t('aed')}\n\n${t('refer_4')}`,
        url: 'https://xzero.app',
        title: 'Refer your friends',
        subject: 'Refer your friends, family and earn rewards',
        tintColor: colors.primary,
        dialogTitle: 'Refer your friends'
      });
    } catch (error) {
      console.log('Share and earn error', error);
    }
  }

  let min_withdraw = refer?.referProgram?.minimum_withdrawal_amount;

  return (
    <SafeView style={styles.container} loading={loading} topNav>
      <TopNavigator
        title={t('refer_earn')}
        leftIconName={params?.drawer && 'bars'}
        leftClick={() => params?.drawer ? navigation.toggleDrawer() : navigation.pop()}
        gradient
      />
      <ScrollView
        contentContainerStyle={styles.shareContainer}
        refreshControl={<RefreshControl refreshing={reloading} onRefresh={reload} />}
      >
        <Box alignItems="center">
          {Platform.OS === 'ios' ?
            <RippleFX onPress={() => handlePlayAnim()}>
              <LottieView
                ref={shareRef}
                style={styles.share}
                source={require("../../../assets/share.json")}
                autoPlay
              />
            </RippleFX>
            :
            <Image style={styles.image} source={require('../../../assets/refer.png')} />
          }
          <Text style={styles.referTitle}>{t('your_referral_code')}</Text>
          <View style={styles.gradient}>
            <Text style={styles.code}>{refer?.referralCode}</Text>
          </View>
          <Row marginBottom={10}>
            <Text style={styles.caption}>{t('discount')} - {refer?.referProgram?.discount}%, </Text>
            <Text style={styles.caption}>{t('max_discount')} {t('aed')} {refer?.referProgram?.allowed_maximum_discount}</Text>
          </Row>
          <Box paddingHorizontal={isTab() ? 100 : 0}>
            <Text style={styles.caption}>{t('refer_desc')}</Text>
          </Box>
        </Box>
        <Row paddingHorizontal={isTab() ? 100 : 0} justifyContent="space-between" marginTop={10}>
          <Column style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor="#d8ddfe">
              <FontAwesomeIcon icon="bullhorn" size={25} color={colors.chip_1} />
            </Box>
            <Box width="100%">
              <Text style={styles.count}>{refer?.totalReferred || 0}</Text>
              <Text style={styles.referCaption}>{t('total_referred')}</Text>
            </Box>
          </Column>
          <Column style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor="#fee5d0">
              <FontAwesomeIcon icon="money-bill-wave" size={25} color={colors.chip_2} />
            </Box>
            <Box width="100%">
              <Text style={styles.count}>{refer?.totalEarned} {t('aed')}</Text>
              <Text style={styles.referCaption}>{t('total_earned')}</Text>
            </Box>
          </Column>
          <Column style={styles.countsContainer}>
            <Box style={styles.iconContainer} backgroundColor="#fbcfd0">
              <FontAwesomeIcon icon="coins" size={25} color={colors.danger} />
            </Box>
            <Box width="100%">
              <Text style={styles.count}>{refer?.balance || 0} {t('aed')}</Text>
              <Text style={styles.referCaption}>{t('wallet_balance')}</Text>
            </Box>
          </Column>
        </Row>
        <Box paddingHorizontal={isTab() ? 100 : 0}>
          <Row style={styles.check} justifyContent="space-between">
            <Button width="49%" status="chip_1" icon="history" onPress={() => handleOpenModal(true)}>{t('refer_history')}</Button>
            <Button width="49%" status="chip_2" icon="coins" onPress={() => handleOpenModal(false)}>{t('withdraw')}</Button>
          </Row>
          <Box marginTop={10} width="100%">
            <Button icon="share-alt" onPress={() => handleShare()}>{t('refer_and_earn_now')}</Button>
          </Box>
        </Box>
      </ScrollView>
      <Modalize ref={modalizeRef} childrenStyle={styles.modal} snapPoint={400} scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }} onClosed={() => _refetch()}>
        {modalComp ?
          <ReferHistory />
          :
          <Withdraw />
        }
      </Modalize>
    </SafeView>
  )
}

export default memo(IsLoggedIn(Refer));