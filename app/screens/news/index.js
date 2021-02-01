import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

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

const News = ({ route }) => {
  const params = route?.params;
  const insets = useSafeAreaInsets();

  return (
    <>
      <SafeView noTop>
        <ScrollView style={styles.container}>
          <ScaleAnim>
            <LinearGradient colors={['#1415181f', '#1415181f', colors.text_dark]} style={styles.gradient} />
            <ProgressiveImage style={styles.newsImage} source={{ uri: params?.uri }} />
            <RippleFX style={[styles.bookmarkContainer, { top: insets.top ? insets.top : 15 }]}>
              <ScaleAnim delay={600}>
                <Icon style={styles.bookmark} name="bookmark" />
              </ScaleAnim>
            </RippleFX>
            <Box style={styles.titleContainer}>
              <FadeInUpAnim delay={300}>
                <Text style={styles.title}>{params?.title}</Text>
              </FadeInUpAnim>
            </Box>
            <Box style={styles.categoryContainer}>
              <FadeInLeftAnim delay={500}>
                <Chip style={styles.category} title="Category" color={colors.chip_1} />
              </FadeInLeftAnim>
              <FadeInLeftAnim delay={700}>
                <Text style={styles.dateCaption}>Posted on 12/12/21</Text>
              </FadeInLeftAnim>
            </Box>
          </ScaleAnim>
          <Box padding={10} paddingTop={0} paddingBottom={insets.bottom ? insets.bottom + 15 : 50}>
            <FadeInUpAnim delay={500}>
              <Text style={styles.caption}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo ullamcorper a. Aliquam eleifend mi in nulla posuere. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Sed enim ut sem viverra aliquet eget sit. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Hac habitasse platea dictumst quisque sagittis purus sit amet. Faucibus a pellentesque sit amet porttitor eget. Egestas purus viverra accumsan in nisl nisi scelerisque. Volutpat est velit egestas dui id ornare arcu odio. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Sit amet commodo nulla facilisi nullam vehicula. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Lectus arcu bibendum at varius. Et pharetra pharetra massa massa ultricies. Dolor sed viverra ipsum nunc aliquet bibendum.

                Adipiscing at in tellus integer. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Nunc scelerisque viverra mauris in aliquam. Volutpat ac tincidunt vitae semper. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Netus et malesuada fames ac turpis egestas sed tempus urna. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Semper feugiat nibh sed pulvinar. Nunc sed blandit libero volutpat sed cras. Mattis aliquam faucibus purus in massa tempor nec feugiat. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Ut consequat semper viverra nam libero justo. Viverra orci sagittis eu volutpat odio. Donec et odio pellentesque diam volutpat commodo. Egestas fringilla phasellus faucibus scelerisque eleifend. Accumsan tortor posuere ac ut.

                Interdum varius sit amet mattis vulputate enim. Nibh cras pulvinar mattis nunc sed blandit libero. Tellus molestie nunc non blandit massa enim nec dui. Et netus et malesuada fames ac turpis egestas. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Metus vulputate eu scelerisque felis imperdiet proin. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Ultrices eros in cursus turpis massa. Elementum sagittis vitae et leo duis ut diam quam nulla. Vehicula ipsum a arcu cursus vitae congue mauris. Massa massa ultricies mi quis.

                At tempor commodo ullamcorper a. Leo duis ut diam quam nulla porttitor massa id neque. Adipiscing enim eu turpis egestas pretium aenean. Dolor sit amet consectetur adipiscing elit. Non curabitur gravida arcu ac tortor. Magna eget est lorem ipsum dolor sit. Sed velit dignissim sodales ut eu sem integer. Tortor dignissim convallis aenean et tortor at. Sit amet aliquam id diam. Dolor morbi non arcu risus quis varius quam quisque. Nisl suscipit adipiscing bibendum est ultricies integer quis. Blandit aliquam etiam erat velit scelerisque in dictum non. Accumsan tortor posuere ac ut consequat semper. Posuere morbi leo urna molestie. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Egestas pretium aenean pharetra magna.

                Volutpat ac tincidunt vitae semper quis lectus nulla at. Tincidunt augue interdum velit euismod in. Felis bibendum ut tristique et egestas quis ipsum. Iaculis nunc sed augue lacus viverra. Eget mauris pharetra et ultrices. Ultrices tincidunt arcu non sodales neque. Fermentum et sollicitudin ac orci. Aenean et tortor at risus viverra adipiscing at in. Sit amet luctus venenatis lectus magna fringilla. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ac placerat vestibulum lectus mauris ultrices eros. Fames ac turpis egestas integer. Vivamus at augue eget arcu dictum varius duis at consectetur.

                Urna condimentum mattis pellentesque id nibh. Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Dui accumsan sit amet nulla facilisi. Sapien nec sagittis aliquam malesuada. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Vel turpis nunc eget lorem dolor sed viverra ipsum. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Faucibus vitae aliquet nec ullamcorper sit amet risus. Arcu non sodales neque sodales ut. Aliquet nibh praesent tristique magna sit amet. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Dignissim convallis aenean et tortor at risus. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in.

                Nisl vel pretium lectus quam id leo. Sit amet consectetur adipiscing elit duis tristique. Neque gravida in fermentum et sollicitudin ac. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Tellus id interdum velit laoreet id. Amet volutpat consequat mauris nunc congue. Rhoncus urna neque viverra justo nec. Nibh mauris cursus mattis molestie. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Sit amet consectetur adipiscing elit pellentesque habitant.

                Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Vel turpis nunc eget lorem dolor sed viverra. Nisi scelerisque eu ultrices vitae. Phasellus vestibulum lorem sed risus. Malesuada fames ac turpis egestas sed tempus urna et. Amet tellus cras adipiscing enim eu. Orci eu lobortis elementum nibh. Sit amet luctus venenatis lectus magna fringilla. Etiam non quam lacus suspendisse faucibus interdum. Urna nunc id cursus metus aliquam eleifend. Id neque aliquam vestibulum morbi.

                In hac habitasse platea dictumst quisque sagittis purus sit. Blandit turpis cursus in hac habitasse platea dictumst. Ornare aenean euismod elementum nisi quis eleifend. Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Porttitor massa id neque aliquam vestibulum. Senectus et netus et malesuada fames ac turpis. Sit amet facilisis magna etiam tempor orci eu lobortis elementum. Duis ut diam quam nulla porttitor massa id neque. Lectus proin nibh nisl condimentum id venenatis a condimentum vitae. Varius sit amet mattis vulputate. Tincidunt tortor aliquam nulla facilisi cras fermentum. Quis vel eros donec ac odio tempor. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.

                Semper auctor neque vitae tempus quam. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Eu non diam phasellus vestibulum lorem sed. Urna et pharetra pharetra massa. Eget mi proin sed libero enim sed. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Congue quisque egestas diam in. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Magna sit amet purus gravida quis blandit turpis. Adipiscing tristique risus nec feugiat in. Sodales neque sodales ut etiam sit amet.
              </Text>
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

export default News;