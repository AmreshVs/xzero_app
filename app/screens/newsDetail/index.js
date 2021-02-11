import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';
import { Video as VideoPlayer } from 'expo-av';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ProgressiveImage from 'components/progressiveImage';
import SafeView from 'components/safeView';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import Button from 'components/button';
import Chip from 'components/chip';
import Row from 'components/row';
import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import { useReduxAction } from 'constants/commonFunctions';
import { handleShare, likeArticle, saveArticle } from 'screens/news/helpers';
import { FadeInUpAnim, ScaleAnim, FadeInLeftAnim } from 'animation';
import Icon from 'icon';
import { markdownStyles, markdownRules } from './helpers';
import styles from './styles';

const NewsDetail = ({ route }) => {
  const data = route?.params;
  const [saved, setSaved] = useState(data?.is_saved);
  const [liked, setLiked] = useState(data?.is_liked);
  const insets = useSafeAreaInsets();
  const client = useApolloClient();
  const { t, i18n } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  let language = i18n.language;

  const handleLike = async () => {
    setLiked(true);
    let likeStatus = await likeArticle(client, Number(userData?.id), Number(data?.id));
    if (liked !== likeStatus) {
      setLiked(likeStatus);
    }
  }

  const handleSave = async () => {
    setSaved(true);
    let savedArticle = await saveArticle(client, Number(userData?.id), Number(data?.id));
    if (saved !== savedArticle) {
      setSaved(savedArticle);
    }
  }

  return (
    <>
      <SafeView noTop>
        <ScrollView style={styles.container}>
          <ScaleAnim>
            <LinearGradient colors={['#1415181f', '#1415181f', colors.text_dark]} style={styles.gradient} />
            <ProgressiveImage style={styles.newsImage} source={{ uri: IMAGE_URL + data?.featured_img?.url }} />
            <RippleFX
              style={[styles.bookmarkContainer, { top: insets.top ? insets.top : 15 }]}
              onPress={() => handleSave()}
            >
              <ScaleAnim delay={600}>
                <Icon style={styles.bookmark} color={saved ? colors.danger : colors.white} name="bookmark" />
              </ScaleAnim>
            </RippleFX>
            <Box style={styles.titleContainer}>
              <FadeInUpAnim delay={300}>
                <Text style={styles.title}>{data?.[`title_${language}`]}</Text>
              </FadeInUpAnim>
            </Box>
            <Box style={styles.categoryContainer}>
              <FadeInLeftAnim delay={500}>
                <Chip borderRadius={5} title={data?.article_category?.[`category_name_${language}`]} color={data?.article_category?.color_code} />
              </FadeInLeftAnim>
              <Row padding={10} justifyContent="space-around" alignItems="center">
                <FadeInLeftAnim delay={600}>
                  <RippleFX onPress={() => handleLike()}>
                    <Row vcenter width={70}>
                      <Icon name="like" size={19} color={liked ? colors.gradient2 : colors.white} hviewBox={520} />
                      <Text style={styles.newsCaption}>{data?.likes}</Text>
                    </Row>
                  </RippleFX>
                </FadeInLeftAnim>
                <FadeInLeftAnim delay={700}>
                  <Row vcenter width={70}>
                    <Icon name="eye" size={19} color={colors.white} wviewBox={560} hviewBox={500} />
                    <Text style={styles.newsCaption}>{data?.views}</Text>
                  </Row>
                </FadeInLeftAnim>
                <FadeInLeftAnim delay={800}>
                  <Row vcenter width={70}>
                    <Icon name="clock" size={16} color={colors.white} hviewBox={490} />
                    <Text style={styles.newsCaption}>20m</Text>
                  </Row>
                </FadeInLeftAnim>
              </Row>
            </Box>
          </ScaleAnim>
          {data?.video_url && (
            <Box marginTop={20} padding={10}>
              <VideoPlayer
                style={styles.videoImage}
                source={{
                  uri: data?.video_url,
                }}
                shouldPlay={true}
                useNativeControls
              />
            </Box>
          )}
          <Box padding={10} paddingTop={0} paddingBottom={insets.bottom ? insets.bottom + 15 : 50}>
            <FadeInUpAnim delay={500}>
              <Markdown
                style={markdownStyles}
                rules={markdownRules}
              >
                {data?.[`desc_${language}`]}
              </Markdown>
            </FadeInUpAnim>
          </Box>
        </ScrollView>
      </SafeView>
      <ScaleAnim style={[styles.btnContainer, { bottom: insets.bottom + 5 }]} delay={800}>
        <Button
          icon="share_alt"
          onPress={() => handleShare(data, i18n)}
        >
          {t('share')}
        </Button>
      </ScaleAnim>
    </>
  )
}

export default NewsDetail;