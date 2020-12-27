import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { THUMBNAIL_SLUG } from 'constants/common';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#EEE',
  },
});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = {
      imgLoaded: false,
    };
  }

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
    this.setState({ imgLoaded: true });
  };
  render() {
    const { thumbnailSource, source, style, noBg = false, noCStyle = false, ...props } = this.props;

    return (
      <View style={[!noCStyle && style, !noBg && styles.container]}>
        <Animated.Image
          source={{ uri: (thumbnailSource || source).uri.replace('/uploads/', '/uploads/' + THUMBNAIL_SLUG) }}
          style={[styles.imageOverlay, style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
          {...props}
        />
        <Animated.Image
          source={source}
          style={[{ opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
          {...props}
        />
      </View>
    );
  }
}

export default ProgressiveImage;
