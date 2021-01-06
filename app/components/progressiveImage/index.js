import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from "react-native-expo-image-cache";

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

const ProgressiveImage = ({ thumbnailSource, source, style, resizeMode, noBg = false, noCStyle = false }) => {
  return (
    <Image
      preview={thumbnailSource || null}
      uri={source?.uri || null}
      style={style}
      // transitionDuration={5000}
      tint="light"
      resizeMode={resizeMode || "cover"}
    />
  );
}

export default memo(ProgressiveImage);
