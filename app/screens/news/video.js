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
import RippleFX from 'components/rippleFx';
import Icon from 'icon';

const Video = () => {
  const [play, setPlay] = useState(false);
  const ViewportAwareVideo = Viewport.Aware(VideoPlayer);

  const params = {
    uri: 'https://imagevars.gulfnews.com/2021/01/10/Stock-Dubai-skyline_176ebfa19ae_medium.jpg',
    title: 'Hello welcome to the news! Checkout the latest news now! and offers from xzero',
    posted_on: '20m'
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
    <Card style={styles.videoContainer} padding={0}>
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
        shouldPlay={false}
        preTriggerRatio={-0.5}
        // onViewportEnter={() => setPlay(true)}
        // onViewportLeave={() => setPlay(false)}
        // onFullscreenUpdate={(e) => onFullscreenUpdate(e)}
        useNativeControls
        usePoster={true}
      />
      <Box padding={10}>
        <Row marginBottom={5} justifyContent="space-between" alignItems="center">
          <Chip borderRadius={5} title="Category" textStyle={styles.chipText} color={colors.chip_1} numOfLines={1} maxWidth={120} />
          <RippleFX style={styles.bookmark}>
            <Icon name="bookmark" size={17} color={colors.danger} hviewBox={520} wviewBox={400} />
          </RippleFX>
        </Row>
        <Text style={styles.title} numberOfLines={2}>{params?.title}</Text>
        <Row marginTop={10} marginBottom={5} justifyContent="space-around" alignItems="center">
          <Row vcenter maxWidth={100}>
            <Icon name="like" size={18} color={colors.ccc} hviewBox={520} />
            <Text style={styles.caption}>20k</Text>
          </Row>
          <Row vcenter maxWidth={100}>
            <Icon name="eye" size={22} color={colors.ccc} wviewBox={560} hviewBox={500} />
            <Text style={styles.caption}>20k</Text>
          </Row>
          <Row vcenter maxWidth={100}>
            <Icon name="clock" size={17} color={colors.ccc} hviewBox={490} />
            <Text style={styles.caption}>{params?.posted_on}</Text>
          </Row>
        </Row>
      </Box>
    </Card>
  )
}

export default memo(Video);