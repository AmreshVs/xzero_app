import React, { memo, useState } from 'react';
import { Platform, Text } from 'react-native';
import { Video as VideoPlayer } from 'expo-av';
import { Viewport } from '@skele/components';
import * as ScreenOrientation from 'expo-screen-orientation';

import Row from 'components/row';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import RippleFX from 'components/rippleFx';
import colors from 'constants/colors';
import Icon from 'icon';
import styles from './styles';
import { useApolloClient } from '@apollo/client';
import { handleShare, likeArticle, saveArticle } from './helpers';
import { FadeAnim, ScaleAnim } from 'animation';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl } from 'constants/commonFunctions';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NEWS_DETAIL } from 'navigation/routes';

let videoOptions = {};

const Video = ({ data, refetch, savedTab, autoPlay = true }) => {
  const [play, setPlay] = useState(false);
  const [saved, setSaved] = useState(data?.is_saved);
  const [liked, setLiked] = useState(data?.is_liked);
  const client = useApolloClient();
  const { push } = useNavigation();
  const ViewportAwareVideo = useMemo(() => Viewport.Aware(VideoPlayer), []);

  const handleNavigate = () => {
    push(NEWS_DETAIL, {
      video: true,
      ...data
    });
  }

  const handleLike = async () => {
    setLiked(true);
    let likeStatus = await likeArticle(client, 65, Number(data?.id));
    if (liked !== likeStatus) {
      setLiked(likeStatus);
    }
  }

  const handleSave = async () => {
    setSaved(true);
    let savedArticle = await saveArticle(client, 65, Number(data?.id));
    if (saved !== savedArticle) {
      setSaved(savedArticle);
      if (savedTab) {
        refetch();
      }
    }
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


  useEffect(() => {
    videoOptions = {
      useNativeControls: true,
      resizeMode: 'cover',
    };

    if (autoPlay) {
      videoOptions = {
        ...videoOptions,
        shouldPlay: false,
        usePoster: true,
        posterSource: {
          uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url)
        },
        posterStyle: styles.poster
        // preTriggerRatio: -0.5,
        // onViewportEnter: () => setPlay(true),
        // onViewportLeave: () => setPlay(false),
        // onFullscreenUpdate: (e) => onFullscreenUpdate(e)
      }
    }
  }, []);

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
          <ScaleAnim delay={100}>
            <RippleFX onPress={() => handleNavigate()}>
              <Chip borderRadius={5} title={data?.article_category?.category_name_en} textStyle={styles.chipText} color={data?.article_category?.color_code} numOfLines={1} maxWidth={120} />
            </RippleFX>
          </ScaleAnim>
          <Row>
            <ScaleAnim delay={200}>
              <RippleFX style={styles.bookmark} onPress={() => handleSave()}>
                <Icon name="bookmark" size={17} color={saved ? colors.danger : colors.ccc} hviewBox={520} wviewBox={400} />
              </RippleFX>
            </ScaleAnim>
            <Box marginHorizontal={8} />
            <ScaleAnim delay={300}>
              <RippleFX style={styles.bookmark} onPress={() => handleShare(data)}>
                <Icon name="share_alt" size={17} color={colors.ccc} hviewBox={520} wviewBox={400} />
              </RippleFX>
            </ScaleAnim>
          </Row>
        </Row>
        <FadeAnim delay={400}>
          <RippleFX onPress={() => handleNavigate()}>
            <Text style={styles.title} numberOfLines={2}>{data?.title_en}</Text>
          </RippleFX>
        </FadeAnim>
        <Row marginTop={10} marginBottom={5} justifyContent="space-around" alignItems="center">
          <ScaleAnim delay={400}>
            <RippleFX style={styles.bookmark} onPress={() => handleLike()}>
              <Row vcenter maxWidth={100}>
                <Icon name="like" size={18} color={liked ? colors?.gradient2 : colors.ccc} hviewBox={520} />
                <Text style={styles.caption}>{data?.likes}</Text>
              </Row>
            </RippleFX>
          </ScaleAnim>
          <ScaleAnim delay={500}>
            <Row vcenter maxWidth={100}>
              <Icon name="eye" size={22} color={colors.ccc} wviewBox={560} hviewBox={500} />
              <Text style={styles.caption}>{data?.views}</Text>
            </Row>
          </ScaleAnim>
          <ScaleAnim delay={600}>
            <Row vcenter maxWidth={100}>
              <Icon name="clock" size={17} color={colors.ccc} hviewBox={490} />
              <Text style={styles.caption}>20m</Text>
            </Row>
          </ScaleAnim>
        </Row>
      </Box>
    </Card>
  )
}

export default memo(Video);