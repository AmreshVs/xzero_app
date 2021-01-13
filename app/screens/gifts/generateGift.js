import React, { useContext, useRef, useState, memo } from 'react';
import { Text, View, Animated, Image, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Button from 'components/button';
import ProgressiveImage from 'components/progressiveImage';
import Box from 'components/box';
import { IMAGE_URL, SCREEN_HEIGHT } from 'constants/common';
import { getAuthenticationHeader, isTab, thumbnailUrl } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import { GIFTS } from 'navigation/routes';
import { GENERATE_GIFT } from 'graphql/mutations';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';

const GenerateGift = ({ generated, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [tried, setTried] = useState(generated);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const giftTextAnim = useRef(new Animated.Value(0)).current;
  const giftRef = useRef(null);
  const confettiRef = useRef(null);
  const client = useApolloClient();
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const handleGenerate = async () => {
    setTried(true);
    setLoading(true);
    try {
      const { data } = await client.mutate({
        mutation: GENERATE_GIFT,
        variables: {
          user_id: Number(userData?.id)
        },
        ...getAuthenticationHeader(userData?.jwt)
      });

      setLoading(false);
      setData(data?.GenerateGift);
      Won(data?.GenerateGift);
    }
    catch (error) {
      // console.log('Generate Gift error', error);
      setLoading(false);
      ToastMsg(t('error_occured'));
      logError({
        screen: GIFTS,
        module: 'Generate Gift',
        input: JSON.stringify({
          user_id: Number(userData?.id)
        }),
        error: JSON.stringify(error)
      });
    }

    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
    Animated.timing(
      translateAnim,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
    Animated.timing(
      giftTextAnim,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
  }

  const Won = (data) => {
    if (giftRef.current) {
      giftRef.current.play(0, 140);
      setTimeout(() => {
        confettiRef.current.play();
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 650,
          }
        ).start();
        Animated.timing(
          translateAnim,
          {
            toValue: -45,
            duration: 650,
          }
        ).start();
        Animated.timing(
          giftTextAnim,
          {
            toValue: isTab() ? 180 : SCREEN_HEIGHT / 14,
            duration: 650,
          }
        ).start();
      }, 2000);
    }

    if (data?.won) {
      setTimeout(() => {
        setModalVisible(true);
      }, 5000);
    }
  }

  const handleClose = () => {
    setModalVisible(false);
    refetch();
  }

  return (
    <>
      <Card style={styles.lottieGiftContainer}>
        <View style={styles.hideOverflow}>
          <Animated.View
            style={{
              ...styles.giftReveal,
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            }}
          >
            <View style={styles.giftRevealImage}>
              <Image
                source={data?.won ? { uri: IMAGE_URL + thumbnailUrl(data?.gift?.featured_img?.url) } : require('../../../assets/sad.png')} style={styles.sadIcon}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
          <LottieView
            ref={giftRef}
            style={styles.generateGift}
            source={require("../../../assets/gift_animation.json")}
            loop={false}
          />
          <LottieView
            ref={confettiRef}
            style={styles.confetti}
            source={require("../../../assets/confetti.json")}
            loop={false}
          />
          <Animated.View
            style={{
              ...styles.giftReveal,
              opacity: fadeAnim,
              transform: [{ translateY: giftTextAnim }],
            }}
          >
            <Text style={styles.giftRevealText}>{data?.won ? t('you_won') + data?.gift?.[`name_${language}`] : t('better_luck')}</Text>
          </Animated.View>
          <View style={styles.generate}>
            <Button
              status="chip_1"
              width="50%"
              onPress={() => handleGenerate()}
              loading={loading}
              disabled={tried !== true ? false : true}
              timeout={false}
            >
              {t('try_your_luck')}
            </Button>
            <Text style={styles.caption}>{t('gifts_open')}</Text>
          </View>
        </View>
      </Card>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}
        statusBarTranslucent={true}
      >
        <View style={styles.modal}>
          <Box style={styles.modalView}>
            <ProgressiveImage
              thumbnailsource={{ uri: IMAGE_URL + thumbnailUrl(data?.gift?.featured_img?.url) }} style={styles.winImage}
              source={{ uri: IMAGE_URL + data?.gift?.featured_img?.url }} style={styles.winImage}
              style={styles.winImage}
            />
            <Text style={styles.giftRevealText}>{t('you_won') + data?.gift?.[`name_${language}`]}</Text>
            <Box marginBottom={10}>
              <Text style={styles.caption}>{t('gift_notification')}</Text>
            </Box>
            <View style={styles.btnContainer}>
              <Button
                icon="times"
                status="danger"
                size="small"
                onPress={() => handleClose()}
              >
                {t('close')}
              </Button>
            </View>
          </Box>
        </View>
      </Modal>
    </>
  )
}

export default memo(GenerateGift);