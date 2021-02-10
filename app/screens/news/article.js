import React, { useState } from 'react';
import { Text } from 'react-native';

import Row from 'components/row';
import styles from './styles';
import ProgressiveImage from 'components/progressiveImage';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import colors from 'constants/colors';
import Icon from 'icon';
import RippleFX from 'components/rippleFx';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl } from 'constants/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import { NEWS_DETAIL } from 'navigation/routes';
import { likeArticle, saveArticle } from './helpers';
import { useApolloClient } from '@apollo/client';
import { FadeAnim, FadeInLeftAnim, FadeInUpAnim, ScaleAnim } from 'animation';

const Article = ({ data, refetch, savedTab }) => {
  const { push } = useNavigation();
  const client = useApolloClient();
  const [saved, setSaved] = useState(data?.is_saved);
  const [liked, setLiked] = useState(data?.is_liked);

  const params = {
    uri: 'https://imagevars.gulfnews.com/2021/01/10/Stock-Dubai-skyline_176ebfa19ae_medium.jpg',
    title: 'Hello welcome to the news! Checkout the latest news now! and offers from xzero',
    posted_on: '20m'
  }

  const handleNavigate = () => {
    push(NEWS_DETAIL, {
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

  return (
    <Card style={styles.articleContainer} padding={0}>
      <Row>
        <Box width="40%">
          <ScaleAnim delay={100}>
            <RippleFX onPress={() => handleNavigate()}>
              <ProgressiveImage
                thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
                source={{ uri: IMAGE_URL + data?.featured_img?.url }}
                style={styles.image}
              />
            </RippleFX>
          </ScaleAnim>
        </Box>
        <Box width="60%" padding={10}>
          <Row marginBottom={5} justifyContent="space-between" alignItems="center">
            <ScaleAnim delay={200}>
              <Chip borderRadius={5} textStyle={styles.chipText} title={data?.article_category?.category_name_en} color={data?.article_category?.color_code} numOfLines={1} maxWidth={120} />
            </ScaleAnim>
            <Row>
              <ScaleAnim delay={300}>
                <RippleFX style={styles.bookmark} onPress={() => handleSave()}>
                  <Icon name="bookmark" size={17} color={saved ? colors.danger : colors.ccc} hviewBox={520} wviewBox={400} />
                </RippleFX>
              </ScaleAnim>
              <Box marginHorizontal={8} />
              <ScaleAnim delay={400}>
                <RippleFX style={styles.bookmark}>
                  <Icon name="share_alt" size={17} color={colors.ccc} hviewBox={520} wviewBox={400} />
                </RippleFX>
              </ScaleAnim>
            </Row>
          </Row>
          <Box minHeight={60}>
            <FadeAnim delay={500}>
              <RippleFX onPress={() => handleNavigate()}>
                <Text style={styles.title} numberOfLines={3}>{data?.title_en}</Text>
              </RippleFX>
            </FadeAnim>
          </Box>
          <Row marginTop={10} justifyContent="space-around" alignItems="center">
            <RippleFX style={styles.bookmark} onPress={() => handleLike()}>
              <ScaleAnim delay={400}>
                <Row vcenter maxWidth={70}>
                  <Icon name="like" size={16} color={liked ? colors.gradient2 : colors.ccc} hviewBox={520} />
                  <Text style={styles.caption}>{data?.likes}</Text>
                </Row>
              </ScaleAnim>
            </RippleFX>
            <ScaleAnim delay={500}>
              <Row vcenter maxWidth={70}>
                <Icon name="eye" size={19} color={colors.ccc} wviewBox={560} hviewBox={500} />
                <Text style={styles.caption}>{data?.views}</Text>
              </Row>
            </ScaleAnim>
            <ScaleAnim delay={600}>
              <Row vcenter maxWidth={70}>
                <Icon name="clock" size={15} color={colors.ccc} hviewBox={490} />
                <Text style={styles.caption}>{params?.posted_on}</Text>
              </Row>
            </ScaleAnim>
          </Row>
        </Box>
      </Row>
    </Card>
  )
}

export default Article;