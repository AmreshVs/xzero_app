import React from 'react';
import { Text, View } from 'react-native';

import Row from 'components/row';
import styles from './styles';
import ProgressiveImage from 'components/progressiveImage';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import colors from 'constants/colors';

const Article = () => {

  const params = {
    uri: 'https://imagevars.gulfnews.com/2021/01/10/Stock-Dubai-skyline_176ebfa19ae_medium.jpg',
    title: 'Hello welcome to the news! Checkout the latest news now! and offers from xzero',
    posted_on: '20 mins ago'
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
          <Text style={styles.title} numberOfLines={4}>{params?.title}</Text>
          <Row marginTop={10} justifyContent="space-between" alignItems="center">
            <Chip borderRadius={5} title="Category" color={colors.chip_1} numOfLines={1} maxWidth={120} />
            <Text style={styles.caption}>{params?.posted_on}</Text>
          </Row>
        </Box>
      </Row>
    </Card>
  )
}

export default Article;