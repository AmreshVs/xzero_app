import React from 'react';
import { Video as VideoPlayer } from 'expo-av';

import ProgressiveImage from 'components/progressiveImage';
import colors from 'constants/colors';
import styles from './styles';
import { View } from 'react-native';

export const markdownStyles = {
  body: {
    color: colors.text_dark,
    lineHeight: 22
  },
  image: {
    borderRadius: 10,
    overflow: 'hidden'
  },
}

export const markdownRules = {
  image: (
    node,
  ) => {
    const { src, alt } = node.attributes;

    const imageProps = {
      indicator: true,
      key: node.key,
      style: styles.videoImage,
      source: {
        uri: src,
      },
    };

    if (alt) {
      imageProps.accessible = true;
      imageProps.accessibilityLabel = alt;
    }

    return <ProgressiveImage {...imageProps} />;
  },
  video: (node, children, parent) => {
    if (node.attributes.src) {
      return (
        <VideoPlayer
          key={node.key}
          style={styles.videoImage}
          source={{
            uri: node.attributes.src,
          }}
          useNativeControls
        />
      )
    }
  }
}