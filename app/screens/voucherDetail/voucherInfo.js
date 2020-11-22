import React from 'react';
import { Image, Text, View } from 'react-native';

import Card from 'components/card';
import styles from './styles';
import Box from 'components/box';
import Button from 'components/button';
import Row from 'components/row';
import Progress from 'components/progress';
import Divider from 'components/divider';

export default function VoucherInfo() {
  return (
    <Card style={styles.voucherContainer}>
      <View style={styles.voucherImageContainer}>
        <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/0067/3307/0421/files/WhatsApp_Image_2020-03-17_at_5.44.59_PM.jpeg?v=1584439244' }} style={styles.voucherImg} />
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="70%">
          <Row marginBottom={1}>
            <Text style={styles.infoTitle}>Buy</Text>
            <Text style={styles.infoCaption}>Xzero Pen</Text>
          </Row>
          <Row>
            <Text style={styles.infoTitle}>Win</Text>
            <Text style={styles.infoCaption}>Iphone Pro 12 Gold</Text>
          </Row>
        </Box>
        <Box width="30%" marginTop={2}>
          <Button status="chip_1" size="small" icon="share-alt">Share</Button>
        </Box>
      </Row>
      <Box padding={10} paddingTop={5}>
        <Progress percent={30} countText="300 out of 700" />
      </Box>
      <Box padding={10} paddingTop={0}>
        <Text style={styles.caption}>Check below for more details on the product, gift and prize details</Text>
      </Box>
    </Card>
  )
}