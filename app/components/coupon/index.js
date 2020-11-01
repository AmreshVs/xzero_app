import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from 'constants/colors';

export default function Coupon({ percent, promocode }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.coupon}>{percent}% OFF</Text>
      </View>
      <View style={styles.dashed}></View>
      <View style={styles.bottom}>
        <Text style={styles.desc}>Use promocode to get the offer </Text>
        <Text style={styles.promocode}>{promocode}</Text>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 165,
    width: '100%',
    backgroundColor: colors.violet,
    borderRadius: 10,
  },
  top: {
    height: '49.5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: '49.5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashed: {
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dashed',
    borderColor: colors.gray,
    height: '1%',
  },
  circle: {
    width: 25,
    height: 25,
    backgroundColor: colors.white,
    borderRadius: 15,
    margin: -13,
  },
  circleContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  coupon: {
    fontSize: 50,
    color: colors.white,
    fontWeight: '700',
  },
  desc: {
    fontSize: 22,
    color: colors.white,
    textAlign: 'center',
  },
  promocode: {
    fontSize: 22,
    color: colors.white,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '700',
  },
});
