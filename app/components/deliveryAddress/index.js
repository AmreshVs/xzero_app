import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { borderRadius10, font17, marginBottom10, marginTop10, textBoldDark, textLite } from 'constants/commonStyles';
import Row from 'components/row';
import Button from 'components/button';
import Box from 'components/box';
import Textbox from 'components/textbox';
import { SCREEN_HEIGHT } from 'constants/common';

export default function DeliveryAddress({ ...otherStyles }) {
  const [address, setAddress] = useState('12, Downtown, Near Burj Khalifa, Dubai');
  const [edit, setEdit] = useState(false);

  return (
    <View style={{ ...otherStyles }}>
      {!edit ?
        <Row>
          <Box flex={3}>
            <Text style={styles.title}>Delivery Address</Text>
            <Text style={styles.caption}>{address}</Text>
          </Box>
          <Box flex={1}>
            <Button size="small" icon="pen" onPress={() => setEdit(true)}>Edit</Button>
          </Box>
        </Row>
        :
        <Box>
          <Text style={styles.title}>Edit Address</Text>
          <Row>
            <Textbox
              style={styles.textbox}
              value={address}
              onChangeText={(text) => setAddress(text)}
              icon="map-marked"
              placeholder="Address"
              textAlignVertical="top"
              multiline={true}
            />
          </Row>
          <Row justifyContent="flex-end">
            <Button size="small" status="text_lite" width="32%" icon="times" onPress={() => setEdit(false)}>Cancel</Button>
            <Box marginHorizontal={5} />
            <Button size="small" status="success" width="30%" icon="check">Save</Button>
          </Row>
        </Box>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 3,
    ...textBoldDark,
    ...font17,
  },
  caption: {
    ...textLite
  },
  textbox: {
    height: SCREEN_HEIGHT / 8,
    ...marginTop10,
    ...marginBottom10,
    ...borderRadius10,
  },
});