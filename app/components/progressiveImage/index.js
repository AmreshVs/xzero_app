import React, { memo } from 'react';
import { Image } from "react-native-expo-image-cache";

const ProgressiveImage = ({ thumbnailSource, source, style, resizeMode, noBg = false, noCStyle = false }) => {
  return (
    <Image
      preview={thumbnailSource || null}
      uri={source?.uri || null}
      style={[style, { overflow: 'hidden' }]}
      transitionDuration={300}
      tint="light"
      resizeMode={resizeMode || "cover"}
    />
  );
}

export default memo(ProgressiveImage);
