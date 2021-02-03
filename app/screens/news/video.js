import React, { memo, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Video as VideoPlayer } from 'expo-av';
import { Viewport } from '@skele/components';
import * as ScreenOrientation from 'expo-screen-orientation';

import Row from 'components/row';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import colors from 'constants/colors';
import styles from './styles';

const Video = () => {
  const [play, setPlay] = useState(false);
  const ViewportAwareVideo = Viewport.Aware(VideoPlayer);

  const params = {
    uri: 'https://imagevars.gulfnews.com/2021/01/10/Stock-Dubai-skyline_176ebfa19ae_medium.jpg',
    title: 'Hello welcome to the news! Checkout the latest news now! and offers from xzero',
    posted_on: '20 mins ago'
  }

  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (Platform.OS === 'android') {
      switch (fullscreenUpdate) {
        case VideoPlayer.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
          break;
        case VideoPlayer.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
          break;
      }
    }
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
        resizeMode={'cover'}
        shouldPlay={play}
        preTriggerRatio={-0.5}
        onViewportEnter={() => setPlay(true)}
        onViewportLeave={() => setPlay(false)}
        onFullscreenUpdate={(e) => onFullscreenUpdate(e)}
        useNativeControls
        usePoster={true}
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

export default memo(Video);