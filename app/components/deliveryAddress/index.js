import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { font17, textBoldDark, textLite } from 'constants/commonStyles';
import Row from 'components/row';
import Button from 'components/button';
import Box from 'components/box';
import Textbox from 'components/textbox';

export default function DeliveryAddress({ ...otherStyles }) {
  return (
    <View style={{ ...otherStyles }}>
      <Row>
        <Box flex={3}>
          <Text style={styles.title}>Delivery Address</Text>
          <Text style={styles.caption}>12, Downtown, Near Burj Khalifa, Dubai</Text>
        </Box>
        <Box flex={1}>
          <Button size="small" icon="pen">Edit</Button>
        </Box>
      </Row>
      <Row>
        <Textbox
          placeholder="Address"
        />
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    ...textBoldDark,
    ...font17
  },
  caption: {
    ...textLite
  },
  textbox: {
    marginTop: 10,
    marginVertical: 10
  },
});