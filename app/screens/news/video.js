import React from 'react';
import { Text, View } from 'react-native';
import { Video as VideoPlayer } from 'expo-av';
import { Viewport } from '@skele/components';

import Row from 'components/row';
import styles from './styles';
import ProgressiveImage from 'components/progressiveImage';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import colors from 'constants/colors';
import { responsiveWidth } from 'constants/commonFunctions';
import { useState } from 'react';
import { useRef } from 'react';

const Video = () => {
  const [resizeMode, setResizeMode] = useState(true);
  const [play, setPlay] = useState(true);
  const player = useRef(null);
  const ViewportAwareVideo = Viewport.Aware(VideoPlayer);

  const params = {
    uri: 'https://imagevars.gulfnews.com/2021/01/10/Stock-Dubai-skyline_176ebfa19ae_medium.jpg',
    title: 'Hello welcome to the news! Checkout the latest news now! and offers from xzero',
    posted_on: '20 mins ago'
  }

  return (
    <Card style={styles.articleContainer} padding={0}>
      <ViewportAwareVideo
        style={styles.videoImage}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        }}
        posterSource={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
        }}
        posterStyle={styles.poster}
        resizeMode={'contain'}
        shouldPlay={false}
        // preTriggerRatio={-0.5}
        // onViewportEnter={() => setPlay(false)}
        // onViewportLeave={() => setPlay(true)}
        useNativeControls
        usePoster={false}
      />
      <Box padding={10}>
        <Text style={styles.title} numberOfLines={2}>{params?.title}</Text>
        <Row marginTop={10} justifyContent="space-between" alignItems="center">
          <Chip borderRadius={5} title="Category" color={colors.chip_1} numOfLines={1} maxWidth={120} />
          <Text style={styles.caption}>{params?.posted_on}</Text>
        </Row>
      </Box>
    </Card>
  )
}

export default Video;