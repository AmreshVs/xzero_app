import React from 'react';
import { Text, View } from 'react-native';

import Row from 'components/row';
import styles from './styles';
import ProgressiveImage from 'components/progressiveImage';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import colors from 'constants/colors';
import Column from 'components/column';
import Icon from 'icon';
import RippleFX from 'components/rippleFx';

const Article = () => {

  const params = {
    uri: 'https://imagevars.gulfnews.com/2021/01/10/Stock-Dubai-skyline_176ebfa19ae_medium.jpg',
    title: 'Hello welcome to the news! Checkout the latest news now! and offers from xzero',
    posted_on: '20m'
  }

  return (
    <Card style={styles.articleContainer} padding={0}>
      <Row>
        <Box width="40%">
          <ProgressiveImage
            source={{ uri: params?.uri }}
            style={styles.image}
          />
        </Box>
        <Box width="60%" padding={10}>
          <Row marginBottom={5} justifyContent="space-between" alignItems="center">
            <Chip borderRadius={5} textStyle={styles.chipText} title="Category" color={colors.chip_1} numOfLines={1} maxWidth={120} />
            <RippleFX style={styles.bookmark}>
              <Icon name="bookmark" size={17} color={colors.ccc} hviewBox={520} wviewBox={400} />
            </RippleFX>
          </Row>
          <Text style={styles.title} numberOfLines={4}>{params?.title}</Text>
          <Row marginTop={10} justifyContent="space-around" alignItems="center">
            <RippleFX>
              <Row vcenter maxWidth={50}>
                <Icon name="like" size={16} color={colors.gradient2} hviewBox={520} />
                <Text style={styles.caption}>20k</Text>
              </Row>
            </RippleFX>
            <Row vcenter maxWidth={50}>
              <Icon name="eye" size={19} color={colors.ccc} wviewBox={560} hviewBox={500} />
              <Text style={styles.caption}>20k</Text>
            </Row>
            <Row vcenter maxWidth={50}>
              <Icon name="clock" size={15} color={colors.ccc} hviewBox={490} />
              <Text style={styles.caption}>{params?.posted_on}</Text>
            </Row>
          </Row>
        </Box>
      </Row>
    </Card>
  )
}

export default Article;