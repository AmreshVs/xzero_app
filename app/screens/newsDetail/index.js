import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';

import ProgressiveImage from 'components/progressiveImage';
import SafeView from 'components/safeView';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import Button from 'components/button';
import Chip from 'components/chip';
import colors from 'constants/colors';
import { FadeInUpAnim, ScaleAnim, FadeInLeftAnim } from 'animation';
import Icon from 'icon';
import styles from './styles';
import Row from 'components/row';
import { IMAGE_URL } from 'constants/common';

const NewsDetail = ({ route }) => {
  const data = route?.params;
  const insets = useSafeAreaInsets();

  return (
    <>
      <SafeView noTop>
        <ScrollView style={styles.container}>
          <ScaleAnim>
            <LinearGradient colors={['#1415181f', '#1415181f', colors.text_dark]} style={styles.gradient} />
            <ProgressiveImage style={styles.newsImage} source={{ uri: IMAGE_URL + data?.featured_img?.url }} />
            <RippleFX style={[styles.bookmarkContainer, { top: insets.top ? insets.top : 15 }]}>
              <ScaleAnim delay={600}>
                <Icon style={styles.bookmark} name="bookmark" />
              </ScaleAnim>
            </RippleFX>
            <Box style={styles.titleContainer}>
              <FadeInUpAnim delay={300}>
                <Text style={styles.title}>{data?.title_en}</Text>
              </FadeInUpAnim>
            </Box>
            <Box style={styles.categoryContainer}>
              <FadeInLeftAnim delay={500}>
                <Chip borderRadius={5} title="Category" color={colors.chip_1} />
              </FadeInLeftAnim>
              <Row padding={10} justifyContent="space-around" alignItems="center">
                <FadeInLeftAnim delay={600}>
                  <RippleFX>
                    <Row vcenter width={70}>
                      <Icon name="like" size={19} color={colors.gradient2} hviewBox={520} />
                      <Text style={styles.newsCaption}>20k</Text>
                    </Row>
                  </RippleFX>
                </FadeInLeftAnim>
                <FadeInLeftAnim delay={700}>
                  <Row vcenter width={70}>
                    <Icon name="eye" size={19} color={colors.white} wviewBox={560} hviewBox={500} />
                    <Text style={styles.newsCaption}>20k</Text>
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
          <Box padding={10} paddingTop={0} paddingBottom={insets.bottom ? insets.bottom + 15 : 50}>
            <FadeInUpAnim delay={500}>
              <Markdown mergeStyle={styles.caption}>
                {data?.desc_en}
              </Markdown>
            </FadeInUpAnim>
          </Box>
        </ScrollView>
      </SafeView>
      <ScaleAnim style={[styles.btnContainer, { bottom: insets.bottom + 5 }]} delay={800}>
        <Button icon="share_alt">Share</Button>
      </ScaleAnim>
    </>
  )
}

export default NewsDetail;