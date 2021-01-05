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
    <View style={[!noCStyle && style, !noBg && styles.container]}>
      <Image
        preview={thumbnailSource?.uri || null}
        uri={source?.uri || null}
        style={style}
        transitionDuration={1000}
        tint="light"
        resizeMode={resizeMode || "cover"}
      />
    </View>
  );
}

export default memo(ProgressiveImage);
