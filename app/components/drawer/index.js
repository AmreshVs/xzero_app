import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import colors from 'constants/colors';
import Box from 'components/box';
import Row from 'components/row';
import Button from 'components/button';
import { SCREEN_HEIGHT } from 'constants/common';

export default function CustomDrawer(props) {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    itemStyle: {
      borderRadius: 10
    },
    drawerText: {
      marginLeft: -20,
    },
    logo: {
      width: 30,
      height: 30,
      borderRadius: 5,
      marginRight: 15
    },
    footer: {
      position: 'absolute',
      bottom: 0 + insets.bottom,
      borderTopWidth: 2,
      borderTopColor: colors.lite_gray,
      width: '100%'
    },
    content: {
      height: '100%',
    },
    heading: {
      fontWeight: '700',
      color: colors.text_dark
    },
    header: {
      alignItems: 'center'
    },
    headText: {
      fontWeight: '700',
      color: colors.white,
      marginBottom: 5,
    },
    gradient: {
      height: (SCREEN_HEIGHT / 7) + insets.top,
      width: '100%',
      position: 'absolute'
    }
  });

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return 'home';
      case 1:
        return 'ticket-alt';
      case 2:
        return 'bullhorn';
      case 3:
        return 'user-shield';
      case 4:
        return 'check-square';
      default:
        return 'ad';
    }
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.content} {...props}
    >
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <Box style={styles.header} padding={20}>
        <Text style={styles.headText}>Hello!</Text>
        <Text style={styles.headText}>Amresh Vs</Text>
        <Button
          size="small"
          status="danger"
          width="40%"
          icon="sign-out-alt"
        >
          Logout
        </Button>
      </Box>
      {props.state.routeNames.map((item, index) => {
        return (
          <DrawerItem
            label={({ focused, color }) => <Text style={[{ color: focused ? colors.primary : color }, styles.drawerText]}>{item}</Text>}
            icon={({ focused, color, size }) => <FontAwesomeIcon icon={getIcon(index)} color={focused ? colors.primary : color} size={size} />}
            focused={props.state.index === index}
            onPress={() => props.navigation.navigate(item)}
            activeBackgroundColor="#FFF"
            key={index}
          />
        )
      })}
      <Box style={styles.footer} padding={20}>
        <Text style={styles.heading}>Follow us on</Text>
        <Row marginTop={10}>
          <Image style={styles.logo} source={require('../../../assets/facebook-logo.png')} />
          <Image style={styles.logo} source={require('../../../assets/instagram-logo.png')} />
          <Image style={styles.logo} source={require('../../../assets/linkedin-logo.png')} />
        </Row>
      </Box>
    </DrawerContentScrollView>
  )
}