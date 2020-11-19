import React from 'react';
import { Image, Text, View } from 'react-native';

import Card from 'components/card';
import styles from './styles';
import Box from 'components/box';
import Button from 'components/button';
import Row from 'components/row';
import Progress from 'components/progress';
import Divider from 'components/divider';

export default function Voucher() {
  return (
    <Card style={styles.voucherContainer}>
      <View style={styles.voucherImageContainer}>
        <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/0067/3307/0421/files/WhatsApp_Image_2020-03-17_at_5.44.59_PM.jpeg?v=1584439244' }} style={styles.voucherImg} />
        <View style={styles.costContainer}>
          <Text style={styles.cost}>200 AED</Text>
        </View>
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="70%">
          <Row marginBottom={1}>
            <Text style={styles.title}>Buy</Text>
            <Text style={styles.caption}>Xzero Pen</Text>
          </Row>
          <Row>
            <Text style={styles.title}>Win</Text>
            <Text style={styles.caption}>Iphone Pro 12 Gold</Text>
          </Row>
        </Box>
        <Box width="30%" marginTop={2}>
          <Button size="small">Buy Now</Button>
        </Box>
      </Row>
      <Divider />
      <Box padding={10} paddingTop={5}>
        <Progress percent={30} countText="300 out of 700" />
      </Box>
    </Card>
  )
}