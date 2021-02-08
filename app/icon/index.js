import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import colors from 'constants/colors';
import getIconVectorPath from './getIconVectorPath';

const Icon = ({ name, style, wviewBox, hviewBox, d, color = colors.white, size = 20, viewBox = 512 }) => {
  return (
    <Svg style={style} height={size} width={size} viewBox={`0 0 ${wviewBox ? wviewBox : viewBox} ${hviewBox ? hviewBox : viewBox}`}>
      <Path fill={color} d={d || getIconVectorPath(name)} />
    </Svg>
  )
}

export default memo(Icon);