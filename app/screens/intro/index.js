import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 's1',
    text: 'Choose from different membership plans and enjoy the desired benefits',
    title: 'Memberships',
    image: require('../../../assets/screenshot.png'),
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    text: 'Upto 25% off on Domestic Flights',
    image: require('../../../assets/screenshot.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: require('../../../assets/screenshot.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: require('../../../assets/screenshot.png'),
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: require('../../../assets/screenshot.png'),
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    text: ' 10% off on first Train booking',
    image: require('../../../assets/screenshot.png'),
    backgroundColor: '#febe29',
  },
];

export default function Intro() {

  const onDone = () => {
    // setShowRealApp(true);
  };

  const onSkip = () => {
    // setShowRealApp(true);
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showPrevButton={true}
        showSkipButton={true}
        onSkip={onSkip}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: '70%',
    height: 600,
    resizeMode: 'contain',
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

