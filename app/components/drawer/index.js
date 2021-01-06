import React, { useContext } from 'react';
import { Image, Linking, Platform, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import { handlelogout } from 'screens/user/profileView';
import colors from 'constants/colors';
import Box from 'components/box';
import Row from 'components/row';
import Button from 'components/button';
import RippleFX from 'components/rippleFx';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { HOME_SCREEN, HOME_TAB_SCREEN, LOGIN_SCREEN } from 'navigation/routes';

export default function CustomDrawer(props) {
  const { userData, setUserData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    itemStyle: {
      borderRadius: 10
    },
    drawerText: {
      marginLeft: -20,
    },
    logoContainer: {
      width: 30,
      height: 30,
      borderRadius: 5,
      marginRight: 15,
      overflow: 'hidden'
    },
    logo: {
      width: '100%',
      height: '100%',
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
      paddingTop: 0
    },
    heading: {
      fontWeight: '700',
      color: colors.text_dark
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      paddingTop: Platform.OS === 'ios' ? insets.top : 30,
    },
    headerContainer: {
      height: 160,
      margin: 0,
    },
    headText: {
      fontWeight: '700',
      color: colors.white,
      marginBottom: 5,
    },
    gradient: {
      height: '100%',
      width: '100%',
      position: 'absolute',
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
        return 'gifts';
      case 4:
        return 'user-shield';
      case 5:
        return 'check-square';
      default:
        return 'ad';
    }
  }

  const handlePress = () => {
    let dispatch = props.navigation.dispatch;

    props.navigation.toggleDrawer();
    if (userData) {
      props.navigation.navigate(LOGIN_SCREEN);
      handlelogout({ dispatch, setUserData, logError });
    }
    else {
      props.navigation.navigate(LOGIN_SCREEN);
    }

  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.content}
      {...props}
    >
      <Box style={styles.headerContainer}>
        <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
        <Box style={styles.header} padding={20}>
          <Text style={styles.headText}>{t('hello')}</Text>
          <Text style={styles.headText}>{userData?.username}</Text>
          <Button
            size="small"
            status={userData ? 'danger' : 'chip_1'}
            width="50%"
            icon={userData ? 'sign-out-alt' : 'sign-in-alt'}
            onPress={() => handlePress()}
          >
            {userData ? t('logout') : t('login')}
          </Button>
        </Box>
      </Box>
      {props.state.routeNames.map((item, index) => {
        const Item = () => (
          <DrawerItem
            label={({ focused, color }) => <Text style={[{ color: focused ? colors.primary : color }, styles.drawerText]}>{t(item)}</Text>}
            icon={({ focused, color, size }) => <FontAwesomeIcon icon={getIcon(index)} color={focused ? colors.primary : color} size={size} />}
            focused={props.state.index === index}
            onPress={() => props.navigation.navigate(item, { drawer: 1 })}
            activeBackgroundColor="#FFF"
          />
        );

        if (userData === null && !['My Draws', 'Refer', 'Gifts'].includes(item)) {
          return <Item key={index} />
        }

        if (userData !== null) {
          return <Item key={index} />
        }

        return null;
      })}
      <Box style={styles.footer} padding={20}>
        <Text style={styles.heading}>{t('follow_us')}</Text>
        <Row marginTop={10}>
          <RippleFX style={styles.logoContainer} onPress={() => Linking.openURL('https://www.facebook.com/xzeroapp')}>
            <Image style={styles.logo} source={require('../../../assets/facebook-logo.png')} />
          </RippleFX>
          <RippleFX style={styles.logoContainer} onPress={() => Linking.openURL('https://www.instagram.com/xzero.official/')}>
            <Image style={styles.logo} source={require('../../../assets/instagram-logo.png')} />
          </RippleFX>
          <RippleFX style={styles.logoContainer} onPress={() => Linking.openURL('https://www.linkedin.com/company/66666966')}>
            <Image style={styles.logo} source={require('../../../assets/linkedin-logo.png')} />
          </RippleFX>
        </Row>
      </Box>
    </DrawerContentScrollView>
  )
}