import React, { useState } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { likeArticle, saveArticle } from 'screens/news/helpers';
import Card from 'components/card';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import Chip from 'components/chip';
import Row from 'components/row';
import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl, useReduxAction } from 'constants/commonFunctions';
import { NEWS_DETAIL } from 'navigation/routes';
import Icon from 'icon';
import styles from './styles';

const News = ({ data }) => {
  const { push } = useNavigation();
  const client = useApolloClient();
  const [saved, setSaved] = useState(data?.is_saved);
  const [liked, setLiked] = useState(data?.is_liked);
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { i18n } = useTranslation();
  let language = i18n.language;

  const handlePress = () => {
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
    <Card style={styles.newsContainer}>
      <RippleFX
        style={styles.newsImageContainer}
        onPress={() => handlePress()}
      >
        <ProgressiveImage
          style={styles.newsImage}
          thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
          source={{ uri: IMAGE_URL + data?.featured_img?.url }}
        />
      </RippleFX>
      <Row padding={10} paddingBottom={5} justifyContent="space-between" alignItems="center">
        <Chip borderRadius={5} textStyle={styles.chipText} title={data?.article_category?.[`category_name_${language}`]} color={data?.article_category?.color_code} numOfLines={1} maxWidth={120} />
        <RippleFX
          style={styles.bookmark}
          onPress={() => handleSave()}
        >
          <Icon name="bookmark" size={15} textStyle={styles.chipText} color={saved ? colors.danger : colors.ccc} hviewBox={520} wviewBox={400} />
        </RippleFX>
      </Row>
      <Box padding={10} paddingTop={0} paddingBottom={0} minHeight={50}>
        <RippleFX onPress={() => handlePress()}>
          <Text style={styles.newsTitle} numberOfLines={3}>{data?.[`title_${language}`]}</Text>
        </RippleFX>
      </Box>
      <Row padding={10} justifyContent="space-around" alignItems="center">
        <RippleFX
          style={styles.bookmark}
          onPress={() => handleLike()}
        >
          <Row vcenter maxWidth={50}>
            <Icon name="like" size={13} color={liked ? colors.gradient2 : colors.ccc} hviewBox={520} />
            <Text style={styles.newsCaption}>{data?.likes}</Text>
          </Row>
        </RippleFX>
        <Row vcenter maxWidth={50}>
          <Icon name="eye" size={15} color={colors.ccc} wviewBox={560} hviewBox={500} />
          <Text style={styles.newsCaption}>{data?.views}</Text>
        </Row>
        <Row vcenter maxWidth={50}>
          <Icon name="clock" size={13} color={colors.ccc} hviewBox={490} />
          <Text style={styles.newsCaption}>20m</Text>
        </Row>
      </Row>
    </Card>
  )
}

export default News;