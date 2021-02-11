import React, { useState } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';

import Row from 'components/row';
import ProgressiveImage from 'components/progressiveImage';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import RippleFX from 'components/rippleFx';
import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl, useReduxAction } from 'constants/commonFunctions';
import { NEWS_DETAIL } from 'navigation/routes';
import { FadeAnim, ScaleAnim } from 'animation';
import Icon from 'icon';
import { handleShare, likeArticle, saveArticle } from './helpers';
import styles from './styles';

const Article = ({ data, refetch, savedTab }) => {
  const { push } = useNavigation();
  const client = useApolloClient();
  const [saved, setSaved] = useState(data?.is_saved);
  const [liked, setLiked] = useState(data?.is_liked);
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { i18n } = useTranslation();
  let language = i18n.language;

  const handleNavigate = () => {
    push(NEWS_DETAIL, {
      ...data
    });
  }

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
              <Chip borderRadius={5} textStyle={styles.chipText} title={data?.article_category?.[`category_name_${language}`]} color={data?.article_category?.color_code} numOfLines={1} maxWidth={120} />
            </ScaleAnim>
            <Row>
              <ScaleAnim delay={300}>
                <RippleFX style={styles.bookmark} onPress={() => handleSave()}>
                  <Icon name="bookmark" size={17} color={saved ? colors.danger : colors.ccc} hviewBox={520} wviewBox={400} />
                </RippleFX>
              </ScaleAnim>
              <Box marginHorizontal={8} />
              <ScaleAnim delay={400}>
                <RippleFX style={styles.bookmark} onPress={() => handleShare(data, i18n)}>
                  <Icon name="share_alt" size={17} color={colors.ccc} hviewBox={520} wviewBox={400} />
                </RippleFX>
              </ScaleAnim>
            </Row>
          </Row>
          <Box minHeight={60}>
            <FadeAnim delay={500}>
              <RippleFX onPress={() => handleNavigate()}>
                <Text style={styles.title} numberOfLines={3}>{data?.[`title_${language}`]}</Text>
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
                <Text style={styles.caption}>20m</Text>
              </Row>
            </ScaleAnim>
          </Row>
        </Box>
      </Row>
    </Card>
  )
}

export default Article;