import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { useQuery } from '@apollo/client';

import Box from 'components/box';
import Button from 'components/button';
import ProductSlider from 'screens/voucherDetail/productSlider';
import { POPUP } from 'graphql/queries';
import { useTranslation } from 'react-i18next';
import { SCREEN_HEIGHT } from 'constants/common';
import AsyncStorage from '@react-native-community/async-storage';
import { HOME_SCREEN } from 'navigation/routes';
import { ToastMsg } from 'components/toastMsg';
import useErrorLog from 'hooks/useErrorLog';

export default function Popup() {
  const [modalVisible, setModalVisible] = useState(true);
  const { data, loading } = useQuery(POPUP);
  const { t } = useTranslation();
  const { logError } = useErrorLog();

  useEffect(() => {
    checkPopup();
  }, []);

  const checkPopup = async () => {
    try {
      const popupData = await AsyncStorage.getItem('@xzero_popup');
      if (popupData !== null) {
        let data = JSON.parse(popupData);
        setModalVisible(data?.status);
      }
    }
    catch (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: HOME_SCREEN,
        module: 'Getting popup data from Async Storage',
        input: '',
        error: JSON.stringify(error)
      });
    }
  }

  return (
    (loading === false && data?.popUp?.status === true) && (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={styles.modal}
          statusBarTranslucent={true}
        >
          <View style={styles.modal}>
            <Box style={styles.modalView}>
              <View style={styles.btnContainer}>
                <Button
                  icon="times"
                  status="danger"
                  size="small"
                  onPress={() => setModalVisible(false)}
                >
                  {t('close')}
                </Button>
              </View>
              <ProductSlider
                data={data?.popUp?.featured_imgs}
                popup={true}
                height={SCREEN_HEIGHT / 1.5}
              />
            </Box>
          </View>
        </Modal>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#0000008a',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
    minHeight: 200
  },
  image: {
    width: 350,
    height: 500,
    resizeMode: 'cover'
  },
  btnContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2
  }
});