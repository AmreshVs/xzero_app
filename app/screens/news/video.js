import React, { memo, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Video as VideoPlayer } from 'expo-av';
import { Viewport } from '@skele/components';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';

import Row from 'components/row';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import RippleFX from 'components/rippleFx';
import colors from 'constants/colors';
import Icon from 'icon';
import styles from './styles';

const Video = ({ data, autoPlay = true }) => {
  const [play, setPlay] = useState(false);
  const { push } = useNavigation();
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

  const handleNavigate = () => {
    push(NEWS_DETAIL, {
      ...data
    });
  }

  let videoOptions = {
    resizeMode: 'cover',
    useNativeControls: true
  };

  if (autoPlay) {
    videoOptions = {
      ...videoOptions,
      shouldPlay: false,
      // preTriggerRatio: -0.5,
      // onViewportEnter: () => setPlay(true),
      // onViewportLeave: () => setPlay(false),
      // onFullscreenUpdate: (e) => onFullscreenUpdate(e)
    }
  }

  return (
    <Card style={styles.videoContainer} padding={0}>
      <ViewportAwareVideo
        style={styles.videoImage}
        source={{
          uri: data?.video_url,
        }}
        {...videoOptions}
      />
      <Box padding={10}>
        <Row marginBottom={5} justifyContent="space-between" alignItems="center">
          <RippleFX onPress={() => handleNavigate()}>
            <Chip borderRadius={5} title={data?.article_category?.category_name_en} textStyle={styles.chipText} color={data?.article_category?.color_code} numOfLines={1} maxWidth={120} />
          </RippleFX>
          <RippleFX style={styles.bookmark}>
            <Icon name="bookmark" size={17} color={data?.is_saved ? colors.danger : colors.ccc} hviewBox={520} wviewBox={400} />
          </RippleFX>
        </Row>
        <RippleFX onPress={() => handleNavigate()}>
          <Text style={styles.title} numberOfLines={2}>{data?.title_en}</Text>
        </RippleFX>
        <Row marginTop={10} marginBottom={5} justifyContent="space-around" alignItems="center">
          <Row vcenter maxWidth={100}>
            <Icon name="like" size={18} color={data?.is_liked ? colors?.gradient2 : colors.ccc} hviewBox={520} />
            <Text style={styles.caption}>{data?.likes}</Text>
          </Row>
          <Row vcenter maxWidth={100}>
            <Icon name="eye" size={22} color={colors.ccc} wviewBox={560} hviewBox={500} />
            <Text style={styles.caption}>{data?.views}</Text>
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