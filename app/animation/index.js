import React, { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import posed from 'react-native-pose';

const transition = {
  transition: {
    // type: 'spring',
    // stiffness: 100,
    duration: 500
  }
};

export const ScaleAnim = ({ style, children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);

  const Scale = useMemo(() => (
    posed.View({
      hidden: {
        scale: 0.5,
        opacity: 0,
        ...transition
      },
      visible: {
        scale: 1,
        opacity: 1,
        ...transition
      },
    })
  )
    , [delay]);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 0);
  }, []);

  return (
    <Scale style={style} pose={visible ? 'visible' : 'hidden'}>
      {children}
    </Scale>
  );
}

export const FadeAnim = ({ style, children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);

  const Fade = useMemo(() => (
    posed.View({
      hidden: {
        opacity: 0,
        ...transition
      },
      visible: {
        opacity: 1,
        delay,
        transition: {
          ...transition.transition,
          duration: 1000
        },
      },
    })
  ), [delay]);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 5);
  }, []);

  return (
    <Fade style={style} pose={visible ? 'visible' : 'hidden'}>
      {children}
    </Fade>
  );
}

export const FadeInUpAnim = ({ style, children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);

  const FadeInUp = useMemo(() => (
    posed.View({
      hidden: {
        opacity: 0,
        y: 50,
        ...transition
      },
      visible: {
        opacity: 1,
        y: 0,
        delay,
        ...transition
      },
    })
  ), [delay]);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 5);
  }, []);

  return (
    <FadeInUp style={style} pose={visible ? 'visible' : 'hidden'}>
      {children}
    </FadeInUp>
  );
}

export const FadeInLeftAnim = ({ style, children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);

  const FadeInLeft = useMemo(() => (
    posed.View({
      hidden: {
        opacity: 0,
        x: -70,
        ...transition
      },
      visible: {
        opacity: 1,
        x: 0,
        delay,
        ...transition
      },
    })
  )
    , [delay]);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 5);
  }, []);

  return (
    <FadeInLeft style={style} pose={visible ? 'visible' : 'hidden'}>
      {children}
    </FadeInLeft>
  );
}