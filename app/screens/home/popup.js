import React, { useState, memo, useContext } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ProductSlider from 'screens/voucherDetail/productSlider';
import Box from 'components/box';
import Button from 'components/button';
import { SCREEN_HEIGHT } from 'constants/common';
import { UserDataContext } from 'context';
import { POPUP } from 'graphql/queries';

const Popup = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const { data, loading } = useQuery(POPUP);
  const { userData } = useContext(UserDataContext);
  const { t } = useTranslation();

  return (
    (loading === false && data?.popUp?.status === true && userData?.show_popup === true) && (
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

export default memo(Popup);

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