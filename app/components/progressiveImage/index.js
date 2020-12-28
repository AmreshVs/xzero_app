import React from 'react';
import { memo } from 'react';
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
  container: {
    // backgroundColor: '#EEE',
  },
});

const ProgressiveImage = (props) => {

  const { thumbnailSource, source, style, resizeMode, noBg = false, noCStyle = false } = props;
  return (
    <View style={[!noCStyle && style, !noBg && styles.container]}>
      <Image
        preview={thumbnailSource?.uri}
        uri={source?.uri}
        style={style}
        transitionDuration={60}
        tint="light"
        resizeMode={resizeMode || "cover"}
      />
    </View>
  );
}

export default memo(ProgressiveImage);
